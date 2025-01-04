const Events = require('../../api/v1/events/model');
const { checkingImage } = require('./images');
const { checkingCategory } = require('./categories');
const { checkingTalent } = require('./talents');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query;
    let condition = {};

    if (keyword) condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    if (category) condition = { ...condition, category: category };
    if (talent) condition = { ...condition, talent: talent };

    const result = await Events.find(condition)
        .populate({ path: 'image', select: '_id name' })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' },
        });

    return result;
};

const createEvent = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    await checkingImage(image);
    await checkingCategory(category);
    await checkingTalent(talent);

    const check = await Events.findOne({ title });
    if (check) throw new BadRequestError('Judul event duplikat!');

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    });

    return result;
};

const findEvent = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({ _id: id })
        .populate({ path: 'image', select: '_id name' })
        .populate({
            path: 'category',
            select: '_id name',
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' },
        });

    if (!result) {
        throw new NotFoundError(`Tidak ada event dengan id: ${id}`);
    }

    return result;
};

const updateEvent = async (req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    await checkingImage(image);
    await checkingCategory(category);
    await checkingTalent(talent);

    const checkId = await Events.findOne({ _id: id });
    if (!checkId) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

    const checkTitle = await Events.findOne({
        title,
        _id: { $ne: id },
    });
    if (checkTitle) throw new BadRequestError('Judul event duplikat!');

    const result = await Events.findOneAndUpdate(
        { _id: id },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
        },
        { new: true, runValidators: true },
    );

    return result;
};

const destroyEvent = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

    await result.deleteOne();

    return result;
};

module.exports = {
    getAllEvents,
    createEvent,
    findEvent,
    updateEvent,
    destroyEvent,
};
const Talents = require('../../api/v1/talents/model');
const { checkingImage } = require('./images');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllTalents = async (req) => {
    const { keyword } = req.query;

    let condition = {};

    if (keyword) {
        condition = {
            ...condition,
            name: {
                $regex: keyword,
                $options: 'i',
            }
        };
    }

    const result = await Talents.find(condition)
        .populate({
            path: 'image',
            select: '_id name',
        })
        .select('_id name role image');

    return result;
};

const findTalent = async (req) => {
    const { id } = req.params;
    const result = await checkingTalent(id);
    return result;
};

const createTalent = async (req) => {
    const { name, role, image } = req.body;

    await checkingImage(image);

    const check = await Talents.findOne({ name });
    if (check) throw new BadRequestError('Nama talent duplikat!');

    const result = await Talents.create({ name, image, role });

    return result;
};

const updateTalent = async (req) => {
    const { id } = req.params;
    const { name, image, role } = req.body;

    await checkingImage(image);
    await checkingTalent(id);

    const checkTitle = await Talents.findOne({
        name,
        _id: { $ne: id },
    });
    if (checkTitle) throw new BadRequestError('Nama talent duplikat!');

    const result = await Talents.findOneAndUpdate(
        { _id: id },
        { name, image, role },
        { new: true, runValidators: true }
    );

    return result;
};

const destroyTalent = async (req) => {
    const { id } = req.params;

    const result = await checkingTalent(id);

    await result.deleteOne();

    return result;
};

const checkingTalent = async (id) => {
    const result = await Talents.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada talent dengan id: ${id}`);
    return result;
}

module.exports = {
    getAllTalents,
    findTalent,
    createTalent,
    updateTalent,
    destroyTalent,
    checkingTalent,
};

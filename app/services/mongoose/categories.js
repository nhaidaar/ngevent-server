const Categories = require('../../api/v1/categories/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllCategories = async (req) => {
    const result = await Categories.find({
        organizer: req.user.organizer,
    });

    return result;
}

const findCategory = async (req) => {
    const { id } = req.params;
    const result = await checkingCategory(id);
    if (result.organizer.id !== req.user.organizer) {
        throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
    }

    return result;
}

const createCategory = async (req) => {
    const { name } = req.body;

    const check = await Categories.findOne({
        name: name,
        organizer: req.user.organizer,
    });
    if (check) throw new BadRequestError('Kategori nama duplikat!');

    const result = await Categories.create({
        name,
        organizer: req.user.organizer,
    });

    return result;
}

const updateCategory = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    const checkId = await Categories.findOne({
        _id: id,
        organizer: req.user.organizer,
    });
    if (!checkId) throw new NotFoundError('Kategori tidak ditemukan!');

    const check = await Categories.findOne({
        name,
        _id: { $ne: id }, // Search all except the same id
    });
    if (check) throw new BadRequestError('Nama kategori duplikat!');

    const result = await Categories.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true }
    );

    return result;
}

const destroyCategory = async (req) => {
    const { id } = req.params;
    const result = await checkingCategory(id);
    if (result.organizer.id !== req.user.organizer) {
        throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
    }

    await result.deleteOne();
    return result;
}

const checkingCategory = async (id) => {
    const result = await Categories.findOne({ _id: id });

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);
    return result;
}

module.exports = {
    getAllCategories,
    findCategory,
    createCategory,
    updateCategory,
    destroyCategory,
    checkingCategory,
};
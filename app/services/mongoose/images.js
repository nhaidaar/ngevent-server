const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

const generateImage = async (req) => {
    const result = `uploads/${req.file.filename}`;

    return result;
};

const createImage = async (req) => {
    const result = await Images.create({
        url: req.file
            ? `uploads/${req.file.filename}`
            : 'uploads/avatar/default.png',
    });

    return result;
};

const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    if (!result) throw new NotFoundError(`Tidak ada gambar dengan id: ${id}`);
    return result;
}

module.exports = { generateImage, createImage, checkingImage };
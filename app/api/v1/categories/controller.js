const Categories = require('../../../services/mongoose/categories');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await Categories.getAllCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await Categories.findCategory(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await Categories.createCategory(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await Categories.updateCategory(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await Categories.destroyCategory(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { index, find, create, update, destroy };
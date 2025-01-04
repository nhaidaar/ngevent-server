const Talents = require('../../../services/mongoose/talents');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await Talents.getAllTalents(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await Talents.findTalent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await Talents.createTalent(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await Talents.updateTalent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await Talents.destroyTalent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { index, find, create, update, destroy };
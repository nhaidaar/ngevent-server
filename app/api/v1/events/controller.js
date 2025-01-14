const Events = require('../../../services/mongoose/events');
const { StatusCodes } = require('http-status-codes');

const index = async (req, res, next) => {
    try {
        const result = await Events.getAllEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await Events.findEvent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await Events.createEvent(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await Events.updateEvent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await Events.destroyEvent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const changeStatus = async (req, res, next) => {
    try {
        const result = await Events.changeStatusEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { index, find, create, update, destroy, changeStatus };
const Organizers = require('../../../services/mongoose/users');
const { StatusCodes } = require('http-status-codes');

const createCMSOrganizer = async (req, res, next) => {
    try {
        const result = await Organizers.createOrganizer(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const createCMSUser = async (req, res, next) => {
    try {
        const result = await Organizers.createUser(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { createCMSOrganizer, createCMSUser };
const Organizers = require('../../../services/mongoose/users');
const { StatusCodes } = require('http-status-codes');

const getCMSUsers = async (req, res, next) => {
    try {
        const result = await Organizers.getAllUsers(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

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

module.exports = { getCMSUsers, createCMSOrganizer, createCMSUser };
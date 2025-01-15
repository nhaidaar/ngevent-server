const Participants = require('../../../services/mongoose/participants');

const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
    try {
        const result = await Participants.signupParticipant(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const activeParticipant = async (req, res, next) => {
    try {
        const result = await Participants.activateParticipant(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const signin = async (req, res, next) => {
    try {
        const result = await Participants.signinParticipant(req);

        res.status(StatusCodes.OK).json({
            data: { token: result },
        });
    } catch (err) {
        next(err);
    }
};

const getAllLandingPage = async (req, res, next) => {
    try {
        const result = await Participants.getAllEvents(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getDashboard = async (req, res, next) => {
    try {
        const result = await Participants.getAllOrders(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const getDetailLandingPage = async (req, res, next) => {
    try {
        const result = await Participants.getOneEvent(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signup,
    activeParticipant,
    signin,
    getAllLandingPage,
    getDetailLandingPage,
    getDashboard,
};
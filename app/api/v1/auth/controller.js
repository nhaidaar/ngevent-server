const Auth = require('../../../services/mongoose/auth');
const { StatusCodes } = require('http-status-codes');

const signInCMS = async (req, res, next) => {
    try {
        const result = await Auth.signIn(req);

        res.status(StatusCodes.CREATED).json({
            data: { token: result },
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { signInCMS };
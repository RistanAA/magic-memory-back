const jwt = require('jsonwebtoken');
const User  = require('../schemas/user');
const JWT_SECRET_KEY = 'memorygame';

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers
		const [authType, authToken] = (authorization || '').split(' ')

		if (!authToken || authType !== 'Bearer') {
			return res.status(400).send({ errorMessage: 'You are not logged in' })
		}

		try {
			const dataUser = jwt.verify(authToken, JWT_SECRET_KEY)
			// console.log(dataUser.user._id)
			// return res.send(dataUser.user._id)
			const user = await User.findOne({_id:dataUser.user._id})
			// console.log(user)
			if (!user) {
				return res.status(401).send({ errorMessage: 'User not found' })
			}
			res.locals.user = {
				username: user.username,
				role: user.role
			}
			next()
		}
		catch (e) {
			res.status(401).send({ errorMessage: 'Login Please!' })
		}
	} catch (error) {
		return res.status(400).send({
			errorMessage: error.message
		});
	}
}
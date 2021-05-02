const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const tokens = require('../utils/tokens');

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {object} the user object on success and an empty object on failure 
		**/
		getCurrentUser: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return({}) }
			const found = await User.findOne(_id);
			if(found) return found;
		},
	},
	Mutation: {
		/** 
			@param 	 {object} args - login info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		login: async (_, args, { res }) => {	
			const { email, password } = args;

			const user = await User.findOne({email: email});
			if(!user) return({});

			const valid = await bcrypt.compare(password, user.password);
			if(!valid) return({});
			// Set tokens if login info was valid
			const accessToken = tokens.generateAccessToken(user);
			const refreshToken = tokens.generateRefreshToken(user);
			res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			return user;
		},
		/** 
			@param 	 {object} args - registration info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		register: async (_, args, { res }) => {
			const { email, password, firstName, lastName } = args;
			const alreadyRegistered = await User.findOne({email: email});
			if(alreadyRegistered) {
				console.log('User with that email already registered.');
				return(new User({
					_id: '',
					firstName: '',
					lastName: '',
					email: 'already exists', 
					password: '',
					initials: ''}));
			}
			const hashed = await bcrypt.hash(password, 10);
			const _id = new ObjectId();
			const user = new User({
				_id: _id,
				firstName: firstName,
				lastName: lastName,
				email: email, 
				password: hashed,
				initials: `${firstName[0]}.${lastName[0]}.`
			})
			const region = new User({
				_id: _id,
				firstName: firstName,
				lastName: lastName,
				email: email, 
				password: hashed,
				initials: `${firstName[0]}.${lastName[0]}.`
			})
			const saved = await user.save();//creates new object in the db
			// After registering the user, their tokens are generated here so they
			// are automatically logged in on account creation.
			const accessToken = tokens.generateAccessToken(user);
			const refreshToken = tokens.generateRefreshToken(user);
			res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); //set ther because someone someone has registered
			return user;
		},
		update: async(_, args, { res }) =>{
			const { _id, email, password, firstName, lastName } = args;
			// const user = await User.findOne({email: email});
			console.log("user id from update: ", _id); //terminal
			const alreadyRegistered = await User.findOne({email: email});
			if(alreadyRegistered) {
				console.log('Email already registered.');
				return(new User({
					_id: '',
					firstName: '',
					lastName: '',
					email: 'already exists', 
					password: '',
					initials: ''}));
			}
			const hashed = await bcrypt.hash(password, 10);
			const updated = await User.updateOne({_id: _id}, { email: email, password: hashed, firstName: firstName, lastName: lastName }); //returns boolean
			// console.log(updated);
			const user = new User({
				_id: _id,
				firstName: firstName,
				lastName: lastName,
				email: email, 
				password: hashed,
				initials: `${firstName[0]}.${lastName[0]}.`
			})
			// const accessToken = tokens.generateAccessToken(user);
			// const refreshToken = tokens.generateRefreshToken(user);
			// res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			// res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); //is this needed?
			return user;
			
		},
		/** 
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {boolean} true 
		**/
		logout:(_, __, { res }) => {
			res.clearCookie('refresh-token');
			res.clearCookie('access-token');
			return true;
		}
	}
}

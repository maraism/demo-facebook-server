require('dotenv').config();

module.exports = {
	USE_LOCALHOST_SSL: process.env.USE_LOCALHOST_SSL === 'true',
	SESSION_SECRET: process.env.SESSION_SECRET,
	'client': {
		'url': process.env.CLIENT_URL,
	},
	'facebookAuth': {
		'clientID':  process.env.FACEBOOK_CLIENT_ID,
		'clientSecret':  process.env.FACEBOOK_CLIENT_SECRET,
		'callbackURL':  process.env.FACEBOOK_CALLBACK_URL,
		'HUB_VERIFY_TOKEN': process.env.FACEBOOK_HUB_VERIFY_TOKEN
	}
}
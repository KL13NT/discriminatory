const Joi = require('@hapi/joi')

const registrationSchema = Joi.object({
	fullName: Joi.string()
		.pattern(new RegExp('^[a-zA-Z]+\\s[a-zA-Z]+$'))
		.min(5)
		.max(30)
		.required(),

	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),

	role: Joi.string()
		.pattern(new RegExp('(student)|(instructor)|(campus)'))
		.required()
}).with('fullName', 'role')

const loginSchema = Joi.object({
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),

	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required()
}).with('email', 'password')

module.exports = { registrationSchema, loginSchema }

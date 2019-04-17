const Joi = require('joi')

const Schema = {
    Name: Joi.string(),
    Profession: Joi.string(),
    Title: Joi.string(),
    Specialty: Joi.string(),
    Company: Joi.string(),
    Address: Joi.string(),
    Region: Joi.string(),
    Email: Joi.string(),
    Phone: Joi.string(),
    Website: Joi.string(),
    LinkedIn: Joi.string(),
    MemberSince: Joi.string()
}
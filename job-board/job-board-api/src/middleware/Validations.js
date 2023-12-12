const {check, validationResult} = require('express-validator');
const { StatusCodes } = require('http-status-codes');


const sanitizeMultipleSpaces = (value) => {
    return value.replace(/ +/g, ' ').trim();
  };

exports.validateUser = [
    check('fullname').notEmpty().withMessage('fullname is required!').bail().customSanitizer(sanitizeMultipleSpaces),
    check('email').notEmpty().withMessage('Email is required').bail().trim().normalizeEmail().isEmail()
    .withMessage("Provide a valid Email").bail(),
    check('password').notEmpty().withMessage('Password is required!').bail().trim()
    .isLength({min:'8'}).withMessage("Password must contain at least 8 characters").bail(),
    /** validation results */
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:errors.array()[0].msg});
        }
        next();
    }
];

exports.validateEmployer = [
    check('name').notEmpty().withMessage('fullname is required!').bail().customSanitizer(sanitizeMultipleSpaces),
    check('email').notEmpty().withMessage('Email is required').bail().trim().normalizeEmail().isEmail()
    .withMessage("Provide a valid Email").bail(),
    check('password').notEmpty().withMessage('Password is required!').bail().trim()
    .isLength({min:'8'}).withMessage("Password must contain at least 8 characters").bail(),
    check('location').notEmpty().withMessage('fullname is required!').bail().customSanitizer(sanitizeMultipleSpaces),
    check('website').isString().customSanitizer(sanitizeMultipleSpaces),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:errors.array()[0].msg});
        }
        next();
    }
]

exports.validateLogin = [
    check('email').notEmpty().withMessage('Email is required').bail().trim().normalizeEmail().isEmail()
    .withMessage("Provide a valid Email").bail(),
    check('password').notEmpty().withMessage('Password is required!').bail().trim(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:errors.array()[0].msg});
        }
        next();
    }
]
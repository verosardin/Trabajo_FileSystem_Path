const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require ('multer');
const path = require ('path');
const {check, validationResult, body} = require ('express-validator');
let middUploadFile = require('../middlewares/uploadFileMiddleware');
let logDBMiddleware = require ('../middlewares/logDBMiddleware');

/* GET users listing. */
router.get('/register', usersController.register);

router.post('/register', middUploadFile.uploadFile, logDBMiddleware, [
  check('name').isLength({min:1}).withMessage('El campo "name" debe estar completo'),
  check('surname').isLength({min:1}).withMessage('El cambo "surname" debe estar completo'),
  check('email').isEmail().withMessage('Debe escribir un email válido'),
  check('password').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
], usersController.create);

router.get('/login', usersController.login);

router.post('/login', usersController.processLogin);

router.get('/profile/:email', usersController.profile);

module.exports = router;

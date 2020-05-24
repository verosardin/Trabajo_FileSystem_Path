const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require ('path');
const {check, validationResult, body} = require ('express-validator');


function readHTML(filename) {
  let archivoHTML = fs.readFileSync(path.join(__dirname, '/../views/' + filename + '.html'), 'utf-8');
  return archivoHTML;
}

// Lee el archivo Json
function readJSONfile() {
  return JSON.parse(fs.readFileSync(usersController.archivo, 'utf-8'));  
}

// Guarda el json de usuarios
function saveJSONfile(objetos) {
  fs.writeFileSync(usersController.archivo, JSON.stringify(objetos, null, ' '));
}
  // Agrega un nuevo usuario
  function addUserToList(usuario) {
    let usuarios = readJSONfile();
    usuarios.push(usuario);
    saveJSONfile(usuarios);
  }


let usersController = {

archivo: path.join(__dirname, '..') + '/data/users.json',

searchByEmail: function (email) {
  let archivoJson = readJSONfile();
  let user = null;
  archivoJson.forEach((elem, i) => {
    if (elem["email"] == email) {
      user = elem;
    }
  });
  return user; // si no lo encuentra devuelve null
},

profile: function (req, res) {
  let usuario = usersController.searchByEmail(req.params.email);
  res.render('profile', {usuario});
},

register: function(req, res,) {
  res.render('register');
  },

create: function(req,res, next){
let errors = validationResult(req);
if (typeof req.file == 'undefined'){
let nuevoError = {
    value: '',
    msg: 'Es obligatorio subir una imagen de perfil (jpg, jpeg o png).',
    param: 'avatar',
    location: 'files'
}
  errors.errors.push(nuevoError);
}
if (errors.isEmpty()){
let usuario = {
name: req.body.name,
surname: req.body.surname,
email: req.body.email,
password: bcrypt.hashSync(req.body.password, 10),
avatar: req.file.filename
}
addUserToList(usuario);
res.render('profile', {usuario});
} else {
  return res.render('register', {errors: errors.errors});
    }
},

login: function(req,res) {
  res.render ('login');
},

//ProcessLogin

processLogin: function(req,res) {
  let usuario = usersController.searchByEmail(req.body.email);
  if (usuario != null) {
    if (bcrypt.compareSync(req.body.password, usuario.password)) {
    res.send("te encontré");
    } else {
    res.send("Contraseña incorrecta");
    }
  } else {
  res.send ("El usuario no existe");
  }
  }
  }


module.exports = usersController


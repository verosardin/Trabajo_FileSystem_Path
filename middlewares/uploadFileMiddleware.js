const multer = require('multer'); // file uploads
const path = require('path');

// Start File uploads config ---------------------------------------------------------
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/images/avatars')
  },
  filename: function (req, file, cb) {
    let fechaActual = new Date();
    cb(null, req.body.nombre + ' ' + req.body.apellido + ' - ' + fechaActual.getDate() + "-" + fechaActual.getMonth() + "-" + fechaActual.getFullYear() + " " + fechaActual.getHours() + "_" + fechaActual.getMinutes() + "_" + fechaActual.getSeconds() + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return callback(new Error('El avatar sólo puede ser imagen JPG, PNG, JPEG.'))
      }
    callback(null, true)
  }
}).single('avatar');
// End File uploads config ---------------------------------------------------------


let uploadFile = {
  uploadFile: function (req,res,next) {
    upload(req, res, function(err){ // invocamos la función upload de multer para subir el archivo de avatar
      if(err) {
        console.log(err);
        return res.render("index", {title: err});
      } else { next(); } // todo salió bien, continuamos al próximo middleware
    });
  }
}
module.exports = uploadFile;

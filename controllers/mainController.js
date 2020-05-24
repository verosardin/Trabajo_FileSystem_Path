let mainController = {

    index: function (req, res){
        res.render('index', {title: 'Ejercitación Express'});
    },

}

module.exports = mainController
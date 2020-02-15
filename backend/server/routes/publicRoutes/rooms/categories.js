const categoryController = require('../../../controllers/categoriesController');

module.exports = async (req, res, next) => {
    try{
        const category = await categoryController.getAllCategories();
        return res.status(200).json({
            category: category,
        });
    }catch{
        return res.status(500).json({
            error : "Impossible de récupérer les categories"
        }) ;
    }
};

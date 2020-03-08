const categoryController = require('../../../controllers/categoriesController');

module.exports = async (req, res, next) => {
    try{
        const category = await categoryController.getAllCategories();
        if(!category) {
            //if data is empty we return 400 status
            return res.status(400).json({error: "Aucune category"});
        }else{
            return res.status(200).json({
                category: category,
            });
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({
            error : "Impossible de récupérer les categories"
        }) ;
    }
};

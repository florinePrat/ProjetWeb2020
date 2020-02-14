const Category = require('../models/categories');

const getAllCategories = async() => {
    try {
        return await Category.find();
    } catch(error) {
        console.log("erreur lors de la recherche des catégories");
        return error;
    }
};

module.exports = {
    getAllCategories
};


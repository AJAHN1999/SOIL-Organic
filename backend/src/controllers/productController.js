

module.exports = (db) => {
    const bcrypt = require('bcrypt');
    const { generateToken } = require('../utils/jwtUtils');
    const { Product, Review } = db.models;
    // const { sequelize } = db;

    return{
            getAllProducts: async (req, res) => {
              try {
                const products = await Product.findAll({
                  include: [{
                    model: Review,
                    as: 'reviews',
                    attributes: ['review_id', 'content', 'rating', 'created_at']
                  }]
                });
        
                res.status(200).json(products);
              } catch (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ message: "Server error" });
              }
            },
}
    }
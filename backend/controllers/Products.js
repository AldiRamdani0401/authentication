import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

export const getProducts = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                include:[{
                    model: User
                }]
            });
        }else{
            response = await Product.findAll({
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProductById = (req, res) => {

}

export const createProduct = (req, res) => {

}

export const updateProduct = (req, res) => {

}

export const deleteProduct = (req, res) => {

}
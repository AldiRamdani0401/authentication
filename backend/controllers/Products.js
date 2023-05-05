import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getProducts = async(req, res) => {
    try {
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                include:[{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }else{
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }else{
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where:{
                    [Op.and]:[ {id: product.id} , {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProduct = async(req, res) => {
    const {name, price} = req.body;
    try {
        await Product.create({
            name: name,
            price: price,
            userId: req.userId
        });
        res.status(201).json({msg: "Product Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProduct = (req, res) => {

}

export const deleteProduct = (req, res) => {

}
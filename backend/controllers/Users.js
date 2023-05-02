import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
    });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async(req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak dapat ditemukan.."});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async(req, res) => {
    // Cari user dengan UUID yang sesuai
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    // Jika user tidak ditemukan, kirimkan pesan error
    if(!user) return res.status(404).json({msg: "User tidak dapat ditemukan.."});

    // Ambil data password dari body request
    const {name, email, password, confPassword, role} = req.body;

    let hashPassword;
    // Cek apakah password kosong atau null, jika iya, gunakan password lama
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        // Jika tidak kosong, hash password baru
        hashPassword = await argon2.hash(password);
    }

    // Jika password dan konfirmasi password tidak sama, kirimkan pesan error
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    try {
        // Hapus user dari database berdasarkan ID
        await User.destroy({
            where: {
                id: user.id
            }
        });
        // Kirimkan pesan berhasil jika user berhasil dihapus
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        // Kirimkan pesan error jika terjadi kesalahan saat menghapus user
        res.status(400).json({msg: error.message});
    }
}
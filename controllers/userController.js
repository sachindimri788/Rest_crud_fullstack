const User = require("../models/userModel");

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    }
    catch (e) {
        return res.status(500).json({ message:"failed" })
    }
};

exports.addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({
            name, email
        })
        return res.json({ message: "success" })
    }
    catch (e) {
        return res.status(500).json({ message: "failed" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        const user = await User.findOne({ where: { id } });
        user.name = name;
        user.email = email;
        await user.save();
        return res.json({ message: "success" })
    }
    catch (e) {

        return res.status(500).json({ message: "failed" })
    }
}

exports.delteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        await user.destroy();
        return res.json({ message: "success" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "failed" });
    }
};

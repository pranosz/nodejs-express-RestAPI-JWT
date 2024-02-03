// const { v4: uuid } = require('uuid');
const Product = require('../data/Product');

const getAllProducts = async (req, res) => {
    const products = await Product.find();

    if(!products) {
        res.status(204).json({'message': 'Noproducts found.'});
    }

    res.json(products);
}

const createNewProduct = async (req, res)=>{
    if (!req?.body?.name || !req?.body?.price)  {
        res.status(400).json({'message':'Name and price are required.'});
    } 

    try {
        const newProduct = {
            "name": req.body.name,
            "price": req.body.price
        }

        await Product.create(newProduct);
        res.status(201).json(newProduct);
    } catch(err) {
        console.error(err);
    }
}

const updateProduct = async (req, res)=>{
    let message = `id dosen't exists`;
    if (req.body.id)  {
        console.log("id ", req.body.id);

        const fProduct = await Product.findOne({_id: req.body.id}).exec();
        console.log("fProduct ", fProduct);

        if (fProduct) {
            fProduct.name = req.body.name;
            fProduct.name = req.body.price;

            const result = await fProduct.save();

            res.status(201).json({"product": result})
        }          
    }
    res.status(404).json({"message": message})
}

const deleteProduct = async (req, res)=>{
    let message = `id dosen't exists`;
    if (req.body.id)  {
        await Product.findOneAndDelete({_id: req.body.id}).exec();
        res.json({"id": req.body.id})
    }
    res.status(404).json({"message": message})
}

const getProduct = async (req, res) => {
    let message = `id dosen't exists`;
    if (req.params.id)  {
        const fProduct = await Product.findOne({_id: req.params.id}).exec();
        console.log("fProduct ", fProduct);
        if (fProduct) {
            res.json({
                "id": fProduct._id,
                "name": fProduct.name,
                "price": fProduct.price
            })
        }          
    }
    res.status(404).json({"message": message})
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProduct
}
const { v4: uuid } = require('uuid');
const data = {
    products: require('../data/products.json'),
    setProducts: function(data) {this.products = data}
};

const getAllProducts = (req, res) => {
    res.json(data.products);
}

const createNewProduct = (req, res)=>{
    let newProduct = {};
    if (req.body.name && req.body.price)  {
        newProduct = {
            "id": uuid(),
            "name": req.body.name,
            "price": req.body.price
        }
        data.setProducts([...data, newProduct]);
    }
    res.json(newProduct)
}

const updateProduct = (req, res)=>{
    let message = `id dosen't exists`;
    if (req.body.id)  {
        const index = data.products.findIndex(prod => prod.id === req.body.id);
        if (index !== -1) {
            data.products[index] = {
                "id": req.body.id,
                "name": req.body.name,
                "price": req.body.price
            };
            res.status(201).json({"id": req.body.id})
        }          
    }
    res.status(404).json({"message": message})
}

const deleteProduct = (req, res)=>{
    let message = `id dosen't exists`;
    if (req.body.id)  {
        const newArray = data.products.filter(prod => prod.id !== req.body.id);
        data.setProducts([...newArray]);
        res.json({"products": newArray})
    }
    res.status(404).json({"message": message})
}

const getProduct = (req, res) => {
    let message = `id dosen't exists`;
    if (req.params.id)  {
        const index = data.products.findIndex(prod => prod.id === req.params.id);
        if (index !== -1) {
            res.json({
                "id": data.products[index].id,
                "name": data.products[index].name,
                "price": data.products[index].price
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
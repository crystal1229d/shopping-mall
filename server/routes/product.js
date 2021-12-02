const { response } = require('express');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

router.post('/', (req, res) => {
    // 상품 정보 저장
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
    
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file")

router.post("/image", (req, res) => {
    // Image 저장

    upload(req, res, function (err) {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post("/products", (req, res) => {

    // products collection 에 들어 있는 모든 상품 정보 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {};

    console.log('routes/product.js', limit, skip, term, req.body.filters)

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], // greater than equal
                    $lte: req.body.filters[key][1] // less than equal 
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
            
        }
    }

    if (term) {

        Product
        .find(findArgs)
        .find({ $text: { $search: term } })
        .populate("writer") // writer 에 대한 모든 정보 가져오기
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            productInfo.map((item, index) => {
                console.log(index, item.name, item.description);
            })
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ 
                success: true, 
                productInfo,
                postSize: productInfo.length
            })
        })

    } else {
         
        Product
        .find(findArgs)
        .populate("writer") // writer 에 대한 모든 정보 가져오기
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ 
                success: true, 
                productInfo,
                postSize: productInfo.length
            })
        })

    }

    
})

router.get('/products_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === 'array') {
        // id=123123, 111111, 222222 => ['123123', '111111', '222222']
        let ids = req.query.id.split(',');
        productIds = ids.map(item => {
            return item;
        })
    }

    Product.find({ _id: {$in: productIds } })
        .populate("writer")
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
})

module.exports = router;

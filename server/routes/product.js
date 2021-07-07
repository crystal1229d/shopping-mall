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
        console.log(err)
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
    
    let findArgs = {};

    // 모든 상품 정보 조회
    Product
    .find(findArgs)
    .populate("writer")
    .exec((err, productInfo) => {
        // console.log(productInfo)
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true,
            productInfo,
            postSize: productInfo.length 
        })
    })
})



module.exports = router;

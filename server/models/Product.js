const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlenght: 40
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    colors: {
        type: Array,
        default: []
    },
    sizes: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    category: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamp: true })

ProductSchema.index({
    name: 'text',
    description: 'text'
}, {
    weights: {
        name: 5,
        description: 1
    }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product }
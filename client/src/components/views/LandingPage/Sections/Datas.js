const category = [
    {
        "_id": 1,
        "name": "Outer"
    },
    {
        "_id": 2,
        "name": "Top"
    },
    {
        "_id": 3,
        "name": "Bottom"
    },
    {
        "_id": 4,
        "name": "Dress"
    },
    {
        "_id": 5,
        "name": "Acc"
    }
]

const price = [
    {
        "_id": 0,
        "name": "All",
        "array": []
    },
    {
        "_id": 1,
        "name": "0 ~ 999",
        "array": [0, 999]
    },
    {
        "_id": 2,
        "name": "1,000 ~ 4,999",
        "array": [1000, 4999]
    },
    {
        "_id": 3,
        "name": "5,000 ~ 9,999",
        "array": [5000, 9999]
    },
    {
        "_id": 4,
        "name": "More than 10,000",
        "array": [10000, 10000000]
    }
]

export {
    category, price
}
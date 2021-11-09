import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'antd';
import SearchFeature from './Sections/SearchFeature';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import ImageSlider from '../utils/ImageSlider';
import { category, price } from './Sections/Datas';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        category: [],
        price: [] 
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
    }, [])

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
        .then(response => {
            // console.log('getProducts response.data', response.data)
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }

                setPostSize(response.data.postSize)
            } else {
                alert('상품 정보를 가져오는 데 실패했습니다')
            }
        })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const updateSearchTerm = (newSearchTerm) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        return (
            <Col key={index} lg={6} md={8} xs={24}>
                <Card
                    cover={<a href="#"><ImageSlider images={product.images}/></a>}>
                <Meta 
                    title={product.name} 
                    description={product.price} 
                />
                </Card>
            </Col>
        )
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters 
        }

        setSkip(0)
        getProducts(body)
    }

    const handlePrice = (value) => {
        const data = price
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === 'price') {
            let priceValue = handlePrice(filters)
            newFilters[category] = priceValue
        }

        setFilters(newFilters)
        showFilteredResults(newFilters)
    }

    return (
        <div style={{ width:'75%', margin:'3rem auto' }}>

            <div style={{ textAlign:'center' }}>
                SHOW YOURSELF WITH US
            </div>

            {/* Filter */}
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <CheckBox list={category} handleFilters={filters => handleFilters(filters, "category")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>

            {/* Search */}
            <div style={{ display:'flex', justifyContent:'flex-end', margin:'1rem auto' }}>
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            <Row gutter={[16, 16]}>
                { renderCards }
            </Row>

            {/* MoreButton */}
            {
                PostSize >= Limit && 
                <div style={{ justifyContent:'center' }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }

        </div>
    )
}

export default LandingPage

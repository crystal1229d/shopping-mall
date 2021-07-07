import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(0)

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
            console.log(response.data)
            if (response.data.success) {
                setProducts(response.data.productInfo)
            } else {
                alert('상품 정보를 가져오는 데 실패했습니다')
            }
        })
    }
    const renderCards = Products.map((product, index) => {
        console.log(index, product)
        return (
            <Col key={index} lg={6} md={8} xs={24}>
                <Card
                    cover={<a href="#"></a>}>
                <Meta title={product.name} description={product.price} />
                </Card>
            </Col>
        )
    })

    return (
        <div style={{ width:'80%', margin:'1px solid lightgrey' }}>
            <Row gutter={16}>
                { renderCards }
            </Row>
        </div>
    )
}

export default LandingPage

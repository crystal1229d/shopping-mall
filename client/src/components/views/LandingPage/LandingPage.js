import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'antd';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

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
            console.log('getProducts response.data', response.data)
            if (response.data.success) {
                console.log('body', body)
                setProducts(response.data.productInfo)

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

    const renderCards = Products.map((product, index) => {
        console.log('renderCards', index, product)
        return (
            <Col key={index} lg={6} md={8} xs={24}>
                <Card
                    cover={<a href="#"><img style={{ width:'100%', height:'150px' }} alt={product.name} src={`http://localhost:5000/${product.images[0]}`}/></a>}>
                <Meta title={product.name} description={product.price} />
                </Card>
            </Col>
        )
    })

    return (
        <div style={{ width:'75%', margin:'3rem auto' }}>

            <div style={{ textAlign:'center' }}>
                OOTD
            </div>

            {/* Filter */}
            {/* CheckBox */}
            {/* RadioBox */}

            {/* Search */}

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

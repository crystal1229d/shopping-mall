import Axios from 'axios';
import React, { useEffect, useState } from 'react'

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
            if (response.success) {
                // setProducts(response.data)
                console.log(response)
            } else {
                alert('상품 정보를 가져오는 데 실패했습니다')
            }
        })
    }

    return (
        <div style={{ width:'80%', margin:'1px solid lightgrey' }}>
            Products
        </div>
    )
}

export default LandingPage

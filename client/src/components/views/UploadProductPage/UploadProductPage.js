import React, { useState } from 'react'
import FileUploader from '../utils/FileUploader';
import Axios from 'axios';
import { Typography, Button, Form, Input } from 'antd';
import ColorPicker from '../utils/ColorPicker';

const { Title: TitleTag } = Typography;
const { TextArea } = Input;

const Categories = [
    { key: 1, value: 'Outer' },
    { key: 2, value: 'Top' },
    { key: 3, value: 'Bottom' },
    { key: 4, value: 'Dress' },
    { key: 5, value: 'ACC' },
]

function UploadPage(props) {
    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [Description, setDescription] = useState('')
    const [Category, setCategory] = useState(1)
    const [Images, setImages] = useState([])
    const [Colors, setColors] = useState([])
    const [Sizes, setSizes] = useState([])

    const nameChangeHandler = event => {
        setName(event.currentTarget.value)
    }
    const priceChangeHandler = event => {
        setPrice(event.currentTarget.value)
    }
    const descriptionChangeHandler = event => {
        setDescription(event.currentTarget.value)
    }
    const categoryChangeHandler = event => {
        setCategory(event.currentTarget.value)
    }
    const updateColors = newColors => {
        setColors(newColors)
    }
    const updateImages = newImages => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        console.log('submitHandler')

        event.preventDefault()
        
        if ( !Name || !Description || !Price || !Category || !Images.length === 0 ) {
            return alert("모든 값을 넣어주세요")
        }

        const body = {
            writer: props.user.userData._id,
            name: Name,
            price: Price,
            description: Description,
            category: Category,
            images: Images,
            colors: Colors,
            sizes: Sizes
        }

        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공했습니다')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패했습니다')
                }
            })
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                <TitleTag level={2}>상품 업로드</TitleTag>
            </div>
            <Form onSubmit={submitHandler} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                <FileUploader updateImages={updateImages} />

                <label>분류</label>
                <select onChange={categoryChangeHandler} value={Category}>
                    {
                        Categories.map(category => (
                            <option key={category.key} value={category.key}>{category.value}</option>
                        ))
                    }
                </select>
                <label>이름</label>
                <Input onChange={nameChangeHandler} value={Name} />
                <label>가격</label>
                <Input onChange={priceChangeHandler} value={Price} />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <label>색상</label>
                <ColorPicker updateColors={updateColors}/>

                <Button htmlType="submit" style={{ marginTop:'10px' }}>
                    확인
                </Button>
            </Form>
        </div>
    )

}

export default UploadPage

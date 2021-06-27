import React, { useState } from 'react'
import { Icon } from 'antd'
import Dropzone from 'react-dropzone'
import Axios from 'axios'

function FileUploader(props) {
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        let formData = new FormData()
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        Axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {    
                    setImages([...Images, response.data.filePath])     
                    props.updateImages([...Images, response.data.filePath])           
                } else {
                    alert("파일을 저장하는데 실패했습니다")
                }
            })

    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.updateImages(newImages)
    }

    return (
        <div style={{ display:'flex', justifyContent:'space-between' }}>  
            <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <div
                    style={{
                        width:300, height:240, border:'1px solid lightgray', 
                        display:'flex', alignItems:'center', justifyContent:'center', 
                    }} 
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize:'3rem' }} />
                </div>
            )}
            </Dropzone>

            <div
                style={{ 
                    width:'350px', height:'240px', display:'flex', overflowX:'auto', 
                    gap:'10px', border:'1px solid lightgray',
                 }}
            >
                { Images.map((image, index) => (
                    <div key={index} onClick={() => deleteHandler(image)}>
                        <img 
                            style={{ minWidth:'300px', width:'300px', height:'240px' }} 
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                )) }
            </div>

        </div>
    )
}

export default FileUploader

import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';

function SizeMaker(props) {

    const [Sizes, setSizes] = useState([])

    const sizeRef = useRef()

    const sizeAddHandler = () => {
        setSizes([...Sizes, sizeRef.current.state.value])
        sizeRef.current.state.value = ''
        sizeRef.current.focus()
    } 
    const sizeDeleteHandler = (index) => {
        console.log('sizeDeleteHandler', index)
        const newSizes = Sizes
        newSizes.splice(index, 1)
        setSizes(newSizes)
        props.refreshFunction(newSizes)
    }

    return (
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <Input placeholder='Free' style={{ width:'120px' }} ref={sizeRef} />
            <Button style={{ width:'120px' }} onClick={sizeAddHandler} >사이즈 등록</Button>
            { Sizes.map((size, index) => (
                <div onClick={()=>sizeDeleteHandler(index)} key={index} style={{ minWidth:'20px', height:'20px', padding:'15px 10px', borderRadius:'3px', border:'1px solid lightgray', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer' }}>{size}</div>
            )) }
        </div>
    )
}

export default SizeMaker

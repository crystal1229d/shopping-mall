import React, { useState } from 'react'
import { SketchPicker } from 'react-color';
import { Input, Button } from 'antd';

function ColorPicker(props) {
    const [Colors, setColors] = useState([])
    const [PickedColor, setPickedColor] = useState('')
    const [ColorName, setColorName] = useState('')

    const colorChangeHandler = (color) => {
        setPickedColor(color)
    }
    const colorNameChangeHandler = (event) => {
        setColorName(event.currentTarget.value)
    }
    const colorAddHandler = () => {
        if ( !PickedColor.hex || !ColorName ) 
            return alert('좌측 색상표를 클릭해 색상을 선택하고 색상 이름을 입력해주세요')

        setColors([...Colors, { 'hex': PickedColor.hex, 'name': ColorName }])
        props.updateColors([...Colors, { 'hex': PickedColor.hex, 'name': ColorName }])
    }
    const colorDeleteHandler = (index) => {
        // const currentIndex = Colors.indexOf(color)

        const newColors = Colors
        Colors.splice(index, 1)

        setColors(newColors)
        props.updateColors(newColors)
    }
    const colorMouseOverHandler = (index) => {
        
    }

    return (
        <div style={{ width:'100%', height:'350px', display:'flex', gap:'10px' }}>

            <SketchPicker color={PickedColor} onChangeComplete={colorChangeHandler} />

            <div style={{ height:'fit-content', display:'flex', flexWrap:'wrap', gap:'10px' }}>
                <Input style={{ width:'120px' }} onChange={colorNameChangeHandler} value={ColorName} />
                <Button onClick={colorAddHandler}>
                    색상 등록
                </Button>
                <div style={{ 
                    width:'250px', minHeight:'30px', boxSizing:'border-box', height:'fit-content', display:'flex', flexWrap:'wrap', gap:'5px',
                    padding:'5px', margin:'2px', border:'1px solid lightgray', borderRadius:'5px' 
                    }}
                >
                { Colors.map(( {hex, name}, index) => (
                    <div onClick={()=>colorDeleteHandler(index)} onMouseOver={()=>colorMouseOverHandler(index)} key={index} style={{ width:'20px', height:'20px', borderRadius:'50%', background:hex, border:'1px solid lightgray' }}></div>
                )) }
                </div>
            </div>

        </div>
    )
}

export default ColorPicker

import React, { useState } from 'react'
import { SliderPicker } from 'react-color';
import { Button } from 'antd';

function ColorPicker(props) {
    const [Colors, setColors] = useState([])
    const [PickedColor, setPickedColor] = useState("#FFFFFF")

    const colorChangeHandler = (color) => {
        setPickedColor(color)
    }

    const colorAddHandler = () => {
        setColors([...Colors, PickedColor.hex])
        props.updateColors([...Colors, PickedColor.hex])
        console.log('Colors', Colors)
        console.log('PickedColor', PickedColor.hex)
    }

    const colorDeleteHandler = (color) => {
        const currentIndex = Colors.indexOf(color)

        const newColors = Colors
        Colors.splice(currentIndex, 1)

        setColors(newColors)
        props.updateColors(newColors)
    }

    return (
        <div style={{ width:'300px', height:'300px' }}>
            <SliderPicker color={PickedColor} onChangeComplete={colorChangeHandler} />
            <Button onClick={colorAddHandler}>
                색상 등록
            </Button>
            <div style={{ width:'300px', display:'flex', gap:'5px' }}>
                { Colors.map((color, index) => (
                    <div onClick={()=>colorDeleteHandler(color)} key={index} style={{ width:'20px', height:'20px', borderRadius:'50%', background:color }}></div>
                )) }
            </div>
        </div>
    )
}

export default ColorPicker

import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'

const { Panel } = Collapse;

function RadioBox(props) {

    const [Value, setValue] = useState(0)
    
    const renderRadioBoxLists = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
        ))
    )
    
    const handleChange = (event) => {
        console.log(event)
        // setValue()

    }

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Price" key="1">
                <Radio.Group onChange={handleChange} value={Value} >
                    {renderRadioBoxLists()}
                </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox

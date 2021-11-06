import React, { useState } from 'react'
import { Collapse, Checkbox} from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const renderCheckboxLists = () => (
        props.list && props.list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox>{value.name}</Checkbox>
            </React.Fragment>
        ))
    )
    
    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Categories" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )

}

export default CheckBox

import React, { useState } from 'react'
import { Collapse, Checkbox} from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        // 1) 이번에 클릭된 요소의 index 구하기
        const currentIndex = Checked.indexOf(value)

        // 2) 이전에 체크되어 있던 모든 요소
        const newChecked = [...Checked]

        if (currentIndex === -1) {
            // 3-1) 1)과 2)의 교집합(중복)이 없으므로 : 1) + 2)
            newChecked.push(value)
        } else {
            // 3-2) 2)와 1)의 차집합 : 2) - 1)
            newChecked.splice(currentIndex, 1)
        }

        // 4) 위에서 구한 값을 State 에 넣는다 
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => (
        props.list && props.list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true}>
                    <span>{value.name}</span>
                </Checkbox>
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

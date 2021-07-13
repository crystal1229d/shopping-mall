import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
    const [SearchTerm, setSearchTerm] = useState('')

    const SearchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                style={{ width:200 }}
                placeholder="input search text"
                allowClear
                onChange={SearchHandler}
            />
        </div>
    )
}

export default SearchFeature

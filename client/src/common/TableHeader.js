import React from 'react'

const TableHeader = props => {
    return (
        <div className='table-header'>
            <th>{props.name}</th>
        </div>
    )
}
export default TableHeader
import React from 'react'


const TableComponent = ({ data }) => {
    let headings = Object.keys(data[1]);
    console.log('this.props.data', data.data)

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    {
                        headings.map(heading => <th>{heading}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(item =>
                        <tr>
                            {
                                headings.map(heading => <td>{item[heading]}</td>)
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
}
export default TableComponent
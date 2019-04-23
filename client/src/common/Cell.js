import React from 'react'

export default function Cell({ height, content, header, fixed }) {

    const fixedClass = fixed ? ' Cell-fixed' : '';
    const headerClass = header ? ' Cell-header' : '';
    const style = height ? { height: `${height}px` } : undefined;


    const className = (
        `Cell${fixedClass}${headerClass}`
    );

    const cellMarkup = header ? (
        <th scope='col' className={className} style={style}>
            {content}
        </th>
    ) : (
            fixed ? (

                <td scope='row' className={className} style={style}>
                    {content}
                </td>
            ) : (
                    <td className={className} style={style}>
                        {content}
                    </td>
                )
        )

    return (cellMarkup)
}
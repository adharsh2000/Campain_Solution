import React from 'react'

const TableRows = ({rowsData, deleteTableRows, handleChange}) => {
  return (
    rowsData.map((data, index) => {
            const {fullName, emailAddress, contactno}= data;
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                <td>
               <input type="text" value={fullName} onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control"/>
                </td>
                <td><input type="text" value={emailAddress}  onChange={(evnt)=>(handleChange(index, evnt))} name="emailAddress" className="form-control"/> </td>
                <td><input type="text" value={contactno}  onChange={(evnt)=>(handleChange(index, evnt))} name="contactno" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={(evnt)=>(deleteTableRows(index, evnt))}>x</button></td>
            </tr>
            )
        })
  )
}

export default TableRows
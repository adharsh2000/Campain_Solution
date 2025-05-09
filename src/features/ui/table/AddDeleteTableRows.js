import React, { useState } from 'react'
import TableRows from './TableRows';

const AddDeleteTableRows = (props) => {
    const rowsInput={
        fullName:'',
        emailAddress:'',
        contactno:''  
    };
    const [rowsData, setRowsData] = useState([rowsInput]);

    const addRows = (event) => {
        event.preventDefault();
        setRowsData([...rowsData, rowsInput]);
    }

    const deleteRows = (index, evnt) => {
        evnt.preventDefault();
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt)=>{
        evnt.preventDefault();
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }

  return (
    <>
    <div className="container">
            <div className="row">
                <div className="col-sm-8">
                <table className="table">
                    <thead>
                      <tr>
                          <th>No.</th>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Contact No.</th>
                          <th><button className="btn btn-outline-success" onClick={addRows} >+</button></th>
                      </tr>
                    </thead>
                   <tbody>
                   <TableRows rowsData={rowsData} deleteTableRows={deleteRows} handleChange={handleChange} />
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
 
    </>
  )
}

export default AddDeleteTableRows
import React, { useState } from "react";

export const Statuses = () => {
    
    // Create a place to add a new status.
    const [newStatus, setNewStatus] = useState('');
    
    // Build the table to display existing statuses. 
    // Let the user added new statuses.
    return (
        <div>
            <h2>Statuses</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>On Loan</td>                 
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Renewed</td>                
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Returned</td>                 
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Lost</td>                 
                    </tr>
                </tbody>
            </table>

            <h2>Add a Status</h2>
            <form>
                <input 
                    label="Status"
                    type="text"
                    placeholder="Type status here"
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value)}
                    required/>
                <button>Save Status</button>
            </form>
        </div>
    );
}

export default Statuses
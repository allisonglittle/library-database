import React from "react";
import { ImPencil } from "react-icons/im";
// import 

// Build the table header with the different rows.
function PatronList () {
    return (
        <div>
            <h2>Existing Patrons</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Registration Date</th>
                        <th>Contact Email</th>
                        <th>Contact Phone</th>
                        <th>Favorite Book</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Aaron</td>
                        <td>Aaronson</td>
                        <td>12/01/2019</td>
                        <td>aaronson@sample.com</td>
                        <td>111-111-1111</td>
                        <td>Gone with the Wind</td>
                        <td><ImPencil /></td>                    
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Johnson</td>
                        <td>10/31/2017</td>
                        <td>jjohnson@sample.com</td>
                        <td>222-222-2222</td>
                        <td>Green Eggs and Ham</td>
                        <td><ImPencil /></td>                    
                    </tr>
                    <tr>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>04/01/2018</td>
                        <td>jsmith@sample.com</td>
                        <td>333-333-3333</td>
                        <td></td>
                        <td><ImPencil /></td>                    
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PatronList
import React from "react";
// List of library Book inventory
function BookList() {
    return (
        <table>
            <caption>Titles</caption>
            <thead>
                <th>Book ID</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Date Purchased</th>
            </thead>
            <tbody>
                {/* this is temporary, it will eventually be another component that pulls data from SQL*/}
                <tr>
                    <td>103</td>
                    <td>9781328869333</td>
                    <td>1984</td>
                    <td>04/04/2021</td>
                </tr>
                <tr>
                    <td>104</td>
                    <td>9781328869333</td>
                    <td>1984</td>
                    <td>07/14/2021</td>
                </tr>
                <tr>
                    <td>105</td>
                    <td>9780553213102</td>
                    <td>Pride and Prejudice</td>
                    <td>12/10/2020</td>
                </tr>
            </tbody>
        </table>
    );
};

export default BookList;
import React from "react";

function TitleList() {
    return (
        <table>
            <caption>Titles</caption>
            <thead>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Date Published</th>
            </thead>
            <tbody>
                {/* this is temporary, it will eventually be another component that pulls data from SQL*/}
                <tr>
                    <td>9781328869333</td>
                    <td>1984</td>
                    <td>George Orwell</td>
                    <td>Houghton Mifflin</td>
                    <td>04/04/2017</td>
                </tr>
                <tr>
                    <td>9780553213102</td>
                    <td>Pride and Prejudice</td>
                    <td>Jane Austen</td>
                    <td>Penguin Random House</td>
                    <td>12/01/1983</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TitleList;
import React, { useState } from "react";

export const PatronUpdate = () => {

    // Create dummy values.
    let inputFirstName = 'Aaron';
    let inputLastName = 'Aaronson';
    let inputRegisterDate = '12/01/2019';
    let inputContactEmail = 'aaronson@sample.com';
    let inputContactPhone = '111-111-1111';
    let inputFavoriteBook = 'Gone with the Wind';

    // Create handler for changes.
    const [firstName, setFirstName] = useState(inputFirstName);
    const [lastName, setLastName] = useState(inputLastName);
    const [registerDate, setRegistration] = useState(inputRegisterDate);
    const [contactEmail, setEmail] = useState(inputContactEmail);
    const [contactPhone, setPhone] = useState(inputContactPhone);
    const [favoriteTitle, setFavTitle] = useState(inputFavoriteBook);

    // Build a table which displays the current values.
    return (
        <div>
            <h2>Edit Patron</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Registration Date</th>
                        <th>Contact Email</th>
                        <th>Contact Phone</th>
                        <th>Favorite Book</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input
                            type="text"
                            value={firstName}
                        /></td>
                        <td><input 
                            type="text"
                            value={lastName}
                        /></td>
                        <td><input 
                            type="date"
                            value={registerDate}
                        /></td>
                        <td><input 
                            type="email"
                            value={contactEmail}
                        /></td>
                        <td><input 
                            type="tel"
                            value={contactPhone}
                        /></td>
                        <td><input 
                            type="text"
                            value={favoriteTitle}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <button>
                Save Updates
            </button>
        </div>
    );
}

export default PatronUpdate
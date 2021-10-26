import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

export const AddPatron = () => {
    
    // Create handler for new patron.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registerDate, setRegistration] = useState('');
    const [contactEmail, setEmail] = useState('');
    const [contactPhone, setPhone] = useState('');
    const [favoriteTitle, setFavTitle] = useState('');

    // let newPatron = {};

    // const history = useHistory();

    // Build a table which allows the user to input a new patron.
    return (
        <div>
            <h2>Add a New Patron</h2>
            <form>
                <fieldset>
                <input 
                    label="First Name"
                    type="text"
                    placeholder="Type first name here"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required/><br></br>
                <input
                    label="Last Name"
                    type="text"
                    placeholder="Type last name here"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required/><br></br>
                <input
                    label="Registration Date"
                    type="date"
                    placeholder="Type last name here"
                    value={registerDate}
                    onChange={e => setRegistration(e.target.value)}
                    required/><br></br>
                <input
                    label="Email Address"
                    type="email"
                    placeholder="example@email.com"
                    value={contactEmail}
                    onChange={e => setEmail(e.target.value)}
                    /><br></br>
                <input
                    label="Phone Number"
                    type="tel"
                    placeholder="555-555-5555"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={contactPhone}
                    onChange={e => setPhone(e.target.value)}
                    /><br></br>
                <input
                    label="Favorite Title"
                    type="text"
                    placeholder="Patron's Favorite Book"
                    value={favoriteTitle}
                    onChange={e => setFavTitle(e.target.value)}
                />
            </fieldset>
            </form>
            <button>
                Save Patron
            </button>
        </div>
    );
}

export default AddPatron
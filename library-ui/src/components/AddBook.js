import React from "react";

// adds book to library inventory
function AddBook() {
    return (
        <form>
            <h1>Add book to library inventory</h1>
            <label>ISBN: </label>
            <select name="title" id="title">
                <option value="123">123</option>
                <option value="234">234</option>
                <option value="345">345</option>
            </select>
            <label>Purchase Date: </label>
            <input type="date" name="purchase_date" />
        </form>
    );
};

export default AddBook;
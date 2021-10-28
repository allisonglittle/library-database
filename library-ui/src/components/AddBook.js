import React from "react";

// adds book to library inventory
function AddBook() {
    return (
        <form>
            <h1>Add book to library inventory</h1>
            <label>ISBN: </label>
            <select name="title" id="title">
                <option value="9781328869333">9781328869333</option>
                <option value="9780553213102">9780553213102</option>
            </select>
            <label>Purchase Date: </label>
            <input type="date" name="purchase_date" />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddBook;
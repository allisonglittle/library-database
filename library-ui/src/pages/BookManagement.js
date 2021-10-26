import React from "react";
import BookList from "../components/BookList";

function BookManagement() {
    return (
        <div>
            <h1>Book and Inventory Management</h1>
            <div>
                <h3>Add Title to Library</h3>
                <form>
                    <label>ISBN: 
                        <input type="text" name="ISBN" />
                    </label>
                    <label>Title: 
                        <input type="text" name="Title" />
                    </label>
                    <label>Author: 
                        <input type="text" name="Author" />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <BookList />
            </div>
        </div>
    );
};

export default BookManagement;
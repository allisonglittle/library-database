import React from "react";
import AddBook from "../components/AddBook";
import BookList from "../components/BookList";

function BookManagement() {
    return (
        <div>
            <h1>Book and Inventory Management</h1>
            <AddBook />
            <BookList />
        </div>
    );
};

export default BookManagement;
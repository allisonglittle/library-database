import React from "react";
import AddBook from "../components/AddBook";
import BookList from "../components/BookList";

function BookManagement() {
    return (
        <div>
            <h1>Library Inventory Management</h1>
            <BookList />
            <AddBook />
        </div>
    );
};

export default BookManagement;
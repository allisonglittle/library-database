import React from "react";
import AddTitle from "../components/AddTitle";
import BookList from "../components/BookList";

function BookManagement() {
    return (
        <div>
            <h1>Book and Inventory Management</h1>
            <AddTitle />
            <BookList />
        </div>
    );
};

export default BookManagement;
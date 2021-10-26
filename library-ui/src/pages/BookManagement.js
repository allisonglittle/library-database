import React from "react";
import AddBook from "../components/AddBook";
import AddTitle from "../components/AddTitle";
import TitleList from "../components/TitleList";

function BookManagement() {
    return (
        <div>
            <h1>Book and Inventory Management</h1>
            <AddTitle />
            <TitleList />
            <AddBook />
        </div>
    );
};

export default BookManagement;
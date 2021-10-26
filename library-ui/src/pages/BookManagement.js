import React from "react";
import AddTitle from "../components/AddTitle";
import TitleList from "../components/TitleList";

function BookManagement() {
    return (
        <div>
            <h1>Book and Inventory Management</h1>
            <AddTitle />
            <TitleList />
        </div>
    );
};

export default BookManagement;
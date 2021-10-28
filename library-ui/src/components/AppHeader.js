import React from "react";
import { Link } from "react-router-dom";

function AppHeader() {
    return (
        <nav>
            <Link to="/">Library Home</Link>
            <Link to="/patron_management">Patrons</Link>
            <Link to="/book_management">Books</Link>
        </nav>
    );
};

export default AppHeader;
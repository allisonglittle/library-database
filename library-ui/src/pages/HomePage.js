import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to the Team 44 Community Library</h1>
            <Link to="/title_management">Title Management</Link>
            <Link to="/book_management">Book Management</Link>
            <Link to="/patron_management">Patron Management</Link>
        </div>
    )
};

export default HomePage;
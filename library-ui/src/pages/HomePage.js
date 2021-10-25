import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Welcome to the Team 44 Community Library</h1>
            <Link to="/book_management">Book Management</Link>
        </div>
    )
};

export default HomePage;
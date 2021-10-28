import React from "react";
import AddTitle from "../components/AddTitle";
import TitleList from "../components/TitleList";

function TitleManagement() {
    return (
        <div>
            <h1>Title Management</h1>
            <AddTitle />
            <TitleList />
        </div>
    );
};

export default TitleManagement;
import React from "react";
import PatronAdd from "../components/PatronAdd";
import PatronList from "../components/PatronList";


function PatronMangement () {
    return (
        <div>
            <PatronAdd />
            <PatronList />
        </div>
    );
};

export default PatronMangement;
import React from "react";

function AddTitle () {
    return (
        <div>
            <h3>Add Title to Library</h3>
            <form>
                <label>ISBN: 
                    <input type="text" name="ISBN" />
                </label>
                <label>Title: 
                    <input type="text" name="Title" />                   
                </label>
                <label>Author: 
                    <input type="text" name="Author" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
};

export default AddTitle;
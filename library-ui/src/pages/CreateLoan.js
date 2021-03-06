import React from "react";

export const CreateLoan = () => {

    // Build a table which allows the user to create a loan.
    return (
        <div>
            <h2>Create a Loan</h2>
            <form>
                <p><label>Select the Patron: </label>
                    <select>
                        <option value="Aaronson, Aaron">Aaronson, Aaron</option>
                        <option value="Johnson, John">Johnson, John</option>
                        <option value="Smith, Jane">Smith, Jane</option>
                    </select></p>
                <p><label for="books">Choose the books: </label>
                <select name="books" id="books" multiple>
                    <option value="Pride and Prejudice">Pride and Prejudice</option>
                    <option value="1984">1984</option>
                    <option value="Crime and Punishment">Crime and Punishment</option>
                    <option value="Hamlet">Hamlet</option>
                    <option value="One Hundred Years of Solitude">One Hundred Years of Solitude</option>
                </select><br></br>
                </p>
                <button>
                    Create Loan
                </button>
                <button>
                    Reset
                </button>
            </form>

        </div>
    );
}

export default CreateLoan
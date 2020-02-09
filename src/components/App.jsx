import React from "react";
import Form from "../pages/Login";

const userIsRegistered = false;

function App() {
    return (
        <div>
            <Form isRegistered={userIsRegistered} />
        </div>
    );
}

export default App;

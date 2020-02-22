import React from "react";

function Login(props) {
    return (
        <div>
            <h1>Logowanie</h1>
        <form>
            <label htmlFor="email">email</label>
            <input type="email" placeholder="email" name="username"/>
            <label htmlFor="password">password</label>
            <input type="password" placeholder="password" name="password"/>
            {/*{!props.isRegistered && (*/}
            {/*    <input type="password" placeholder="Confirm Password" />*/}
            {/*)}*/}

            <button type="submit">{props.isRegistered ? "Login" : "Register"}</button>
        </form>
        </div>
    );
}

export default Login;

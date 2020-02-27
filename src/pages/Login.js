import React from "react";

function Login() {
    return (
        <div>
            <h1>login h1</h1>

            <div>
                <div>
                    <div>
                        <div>

                            {/*// <!-- Makes POST request to /login route -->*/}
                            <form action="/" method="POST">
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email"/>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password"name="password"/>
                                </div>
                                <button type="submit">Login</button>
                            </form>

                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <a href="/auth/google" role="button">
                                <i className="fab fa-google"></i>
                                Sign In with Google
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;

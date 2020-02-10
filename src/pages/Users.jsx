import React from "react";

class Users extends React.Component{

    state = {
        users: [],
        user: {
            email: "email",
            password: ""
        }
    };

    componentDidMount() {
        this.getUsers();
    }

    getUsers = _ => {
        fetch("http://localhost:8080/api/user")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({users: response});
            })
            .catch(err => console.error(err));
    };

    addUser = _ => {
        const  {user}  = this.state;
        fetch('http://localhost:8080/api/user/register', {
            method: "POST",
                headers: {
                'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(user)
        }
            )
            .then(response => response.json())
            .then(this.getUsers)
            .catch(err => console.error(err));
    };

    renderUser = (({id, email, password}) => <div key={id}>id: {id} email: {email} password: {password}</div>);

    render() {
        const { users, user } = this.state;
        return(
            <div>
                <h1>users h1</h1>
                <div>
                    {users.map(this.renderUser)}
                </div>
                <div>
                    <input
                        type="text"
                        value={user.email}
                        onChange={e => this.setState({user: {...user, email: e.target.value}})}
                    />
                    <input
                        type="password"
                        value={user.password}
                        onChange={e => this.setState({user: {...user, password: e.target.value}})}
                    />
                    <button onClick={this.addUser}>add user</button>
                </div>
            </div>
        );
    }
}

export default Users;
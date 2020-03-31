import React from 'react';
import { List } from 'semantic-ui-react'

const SingleUser = ({ userData, redirect }) => {
    console.log(userData)
   
    return (
        <List.Item as='a' onClick={redirect}>
            <List.Icon name="user" size="large" verticalAlign="middle" />
            <List.Content>
                <List.Header>
                    {userData.user_name} {userData.user_surname}
                </List.Header>
                <List.Description>{userData.user_email}</List.Description>
            </List.Content>
        </List.Item>
    )
}

export default SingleUser;
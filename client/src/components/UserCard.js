import React from 'react';
import { Card, Icon, Image, Button, Modal, Form } from 'semantic-ui-react';

function UserCard(props) {
  const { first_name, last_name, email, createdAt } = props.userData;
  const onSubmit = props.onSubmit;
  const onFirstNameChange = props.onFirstNameChange;
  const onLastNameChange = props.onLastNameChange;

  return (
    <Card style={{ margin: '10px' }}>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          {first_name} {last_name}
        </Card.Header>
        <Card.Meta>
          Joined {createdAt ? createdAt.slice(0, 10) : null}
        </Card.Meta>
        <Card.Description>
          <Icon name="mail"></Icon>
          {email}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="talk" />
        Ho-ho-ho
        <br />
        <Modal 
          trigger={<Button floated="right">Edit</Button>}
          content={
            <Form style={{ margin: '30px 50px'}} onSubmit={onSubmit}>
              <Form.Group widths="equal">
                <Form.Input fluid label="First name" placeholder="First name" onChange={onFirstNameChange}/>
                <Form.Input fluid label="Last name" placeholder="Last name" onChange={onLastNameChange}/>
              </Form.Group>
              <Form.Button primary type="submit">
                Send
              </Form.Button>
            </Form>
          }
        />
      </Card.Content>
    </Card>
  );
}

export default UserCard;

import React from 'react';
import { Card, Icon, Image, Button, Modal, Form } from 'semantic-ui-react';

function ItemCard(props) {

  return (
    <Card style={{ margin: '30px' }}>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          
        </Card.Header>
        <Card.Meta>
          Joined 
        </Card.Meta>
        <Card.Description>
          <Icon name="mail"></Icon>
          
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="talk" />
      </Card.Content>
    </Card>
  );
}

export default ItemCard;

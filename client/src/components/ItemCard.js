import React from 'react';
import { Card, Icon, Image, Button, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function ItemCard(props) {
  const { id, title, price, imageUrl, description } = props.itemData;
  return (
    <Card style={{ margin: '10px' }}>
      <Image
        src={imageUrl}
        style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>Price {price}</Card.Meta>
        <Card.Description>
          <Icon name="tag"></Icon>
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/item/${id}`}>
          <Button inverted color="green">
            Item page
          </Button>
        </Link>
      </Card.Content>
    </Card>
  );
}

export default ItemCard;

import React from 'react';
import { Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react';
import { useState } from 'react';
import { useEffect } from 'react';

const ShowItem = props => {
  const [item, setItemId] = useState({});
  const [url, setUrl] = useState({});

  useEffect( ()=> {
    setItemId(props.item.item)
    setUrl(props.item.itemUrl)
  }, [props.item])
  
  return (
    <Item>
      <Item.Image src={url.img0} />

      <Item.Content>
        <Header as='h1'>Name: {item.item_name}</Header>
        <Header as='h3'>Category: {item.item_category}</Header>
        <Item.Description>Description: {item.item_description}</Item.Description>
        <Item.Description>Item Id: {item.item_id}</Item.Description>
        <Item.Description>User Id: {item.user_id}</Item.Description>
        <Item.Extra>
          <Button primary floated='right'>
            Add Item
            <Icon name='right chevron' />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
          
          
      
      )
      }
      

   

export default ShowItem;
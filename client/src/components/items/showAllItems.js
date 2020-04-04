import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

const ShowAllItemsPage = props => {
const [items, setItems] = useState([]);

const getItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/items");
  
      const parseData = await res.json();
      setItems(parseData);
      
      } catch (err) {
        console.error(err.message);
      }
    };  

  useEffect(() => {
    getItems()
  }, []);
  
  const klik = (item, url) => {
    props.showItem(item, url);
  };

    return (
            <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Item id</Table.HeaderCell>
                <Table.HeaderCell>User id</Table.HeaderCell>

              </Table.Row>
            </Table.Header>
            <Table.Body>
            {
            items.map(item =>  (
            <Table.Row key={item.item_id} onClick= {()=>klik(item, item.item_images)} >
                <Table.Cell><img src = {item.item_images.img0} alt = "obrazek"></img></Table.Cell>
                <Table.Cell>{item.item_name}</Table.Cell>
                <Table.Cell>{item.item_category}</Table.Cell>
                <Table.Cell>{item.item_description}</Table.Cell>
                <Table.Cell>{item.item_id}</Table.Cell>
                <Table.Cell>{item.user_id}</Table.Cell>
                
            </Table.Row> 
            ))
            }
            </Table.Body>
            </Table>
      
        )}
        
           
      
export default ShowAllItemsPage;
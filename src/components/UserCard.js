import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/Card';
import ListGroupItem from 'react-bootstrap/Card';

const getUser = () =>
  fetch('https://randomuser.me/api/').then(response => response.json());

//const sendUpdatedUser = (userUpdatedData) => fetch('https://randomuser.me/api/', { method: 'POST', body: userUpdatedData})

function UserCard() {
  const [userData, setUserData] = React.useState([]);
  // const [isLoading, setLoading] = React.useState(true)
  React.useEffect(() => {
    getUser().then(userData => {
      setUserData(userData);
      //setLoading(false);
    });
  }, []);
  console.log(userData.results);
  // const updateUserData = () => {
  //     setLoading(false)
  // }

  // const onError = (error) => {
  //     setLoading(false)
  //     alert('coś poszło nie tak')
  //     throw error
  // }

  // const onSucces = () => {
  //     setLoading(false)
  //     alert('sukces')
  // }

  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src="https://randomuser.me/api/portraits/women/0.jpg"
      />
      <Card.Body>
        <Card.Title>Imię Nazwisko</Card.Title>
  <Card.Text></Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Lokalizacja</ListGroupItem>
        <ListGroupItem>O mnie</ListGroupItem>
        <ListGroupItem>E-mail</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Moje przedmioty</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;

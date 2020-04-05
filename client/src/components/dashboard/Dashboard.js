import React, { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import { Header, Container } from "semantic-ui-react";

//components

import ItemsForm from "../items/ItemsForm";
import ItemsList from "../items/ItemsList";
import ItemsUser from "../items/ItemsUser";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [itemsChange, setItemsChange] = useState(false);
  // const [otherItems, setOtherItems] = useState([]);
  const [id, setId] = useState("");

  // const getOtherItems = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/dashboard/items", {
  //       method: "GET",
  //       headers: { jwt_token: localStorage.token },
  //     });
  //     const parseData = await res.json();
  //     setOtherItems(parseData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getOtherItems();
  //   setItemsChange(false);
  // }, [itemsChange]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      console.log(parseData);
      setAllItems(parseData);
      setId(parseData[0].user_id);
      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setItemsChange(false);
  }, [itemsChange]);

  return (
    <Fragment>
      <Container>
        {/* <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Items List</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div> */}
        <Container text style={{ marginTop: "7em" }}>
          {/* <ItemSearchFilter /> */}
          <Header as="h1">Semantic UI React Fixed Template</Header>

          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
          <p>
            welcome user: {name} with id: {id}
          </p>
        </Container>
        <ItemsForm setItemsChange={setItemsChange} />
        <ItemsUser allItems={allItems} setItemsChange={setItemsChange} />
        <ItemsList user_id={id} user_name={name} /*otherItems={otherItems}*/ />
      </Container>
    </Fragment>
  );
};

export default Dashboard;

// import React, { useEffect, useState, Fragment } from "react";

// import { toast } from "react-toastify";
// import { Button, Container, Image, Header } from "semantic-ui-react";

// const Dashboard = ({ setAuth }) => {
//   const [name, setName] = useState("");
//   const [id, setId] = useState("");

//   const getProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/dashboard", {
//         method: "GET",
//         headers: { jwt_token: localStorage.token },
//       });
//       const parseData = await res.json();
//       console.log(parseData);
//       setName(parseData.user_name);
//       setId(parseData.user_id);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const logout = async (e) => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem("token");
//       setAuth(false);
//       toast.success("Logout successfully");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);

//   return (
//     <Fragment>
//       <Container>
//         <Container text style={{ marginTop: "7em" }}>
//           <Header as="h1">Semantic UI React Fixed Template</Header>
//           <p>
//             This is a basic fixed menu template using fixed size containers.
//           </p>
//           <p>
//             A text container is used for the main container, which is useful for
//             single column layouts.
//           </p>
//           <p>
//             welcome user: {name} with id: {id}
//           </p>
//           <Button onClick={(e) => logout(e)}>logout</Button>
//         </Container>
//       </Container>
//     </Fragment>
//   );
// };

// export default Dashboard;

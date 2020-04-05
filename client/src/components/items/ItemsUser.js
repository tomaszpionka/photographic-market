import React, { Fragment, useState, useEffect } from "react";
import ItemsEdit from "./ItemsEdit";

const ItemsUser = ({ allItems, setItemsChange }) => {
  const [items, setItems] = useState([]); //empty array
  //   delete item function

  async function deleteItem(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/items/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setItems(items.filter((item) => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setItems(allItems);
  }, [allItems]);

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.length !== 0 &&
            items[0].item_id !== null &&
            items.map((item) => (
              <tr key={item.item_id}>
                <td>{item.user_name}</td>
                <td>{item.item_description}</td>
                <td>
                  <ItemsEdit item={item} setItemsChange={setItemsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteItem(item.item_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ItemsUser;

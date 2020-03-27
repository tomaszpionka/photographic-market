import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "semantic-ui-react";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
      setId(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
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
  }, []);

  return (
    <div>
      <h1>dashboard</h1>
      <h2>
        welcome user {name} of id {id}
      </h2>
      <Button onClick={e => logout(e)}>logout</Button>
    </div>
  );
};

export default Dashboard;

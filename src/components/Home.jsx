import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("https://server-3q0l.onrender.com/user", {
          credentials: "include",
        });

        console.log(res);
        const data = await res.json();
        console.log(data);
        if (res.status === 401) {
          navigate("/");
          return;
        }
        if (!res.ok) {
          console.log(data.message);
          return;
        }

        setUsers(data.user || []);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h1>Welcome to Home page</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

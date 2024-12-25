import React from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <p>No users available to display.</p>;
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/userProfile/${user._id}`}>View Profile</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React from "react";

const Users = props => {
    return (
        <div className="user-list">
            {props.users.map(user => (
                <div className="user" key={user.id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    )
}

export default Users;
import React, { useEffect } from 'react'

const Dashboard = ({socket, username, room}) => {

    const getContacts = () => {

    };

    useEffect(() => {
        socket.on("getContactList", (data) => {
            
        });
    });

    return (
        <div className="dashboard">
            <div className="contactList">
                
            </div>
            <div className="chatArea">

            </div>
        </div>
    )
}

export default Dashboard
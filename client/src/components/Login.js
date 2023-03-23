import React from 'react'
import { useState } from 'react';
import Dashboard from './Dashboard';
import Chat from './Chat';

const Login = ({socket}) => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if(username !== "" && room !== ""){
            socket.emit("join_room", room);
            setShowChat(true);
        }
    }
    return (
        <div className="App">
        {!showChat ? (
            <div className="joinChatContainer">
                <h3>Join A Chat</h3>
                <input
                    type="text"
                    placeholder="Username..."
                    onChange={(event) => {
                    setUsername(event.target.value);
                    }}
                />
                <input
                    type="text"
                    placeholder="Room ID..."
                    onChange={(event) => {
                    setRoom(event.target.value);
                    }}
                />
                <button onClick={joinRoom}>Join A Room</button>
            </div>
        ) : (
            //<Dashboard socket={socket} username={username} room={room}/>
            <Chat socket={socket} username={username} room={room} />
        )}
        </div>
    )
}

export default Login
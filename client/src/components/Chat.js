import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [currentChat, setCurrentChat] = useState("");


    const sendMsg = async () => {
        if (currentMessage !== "") {
        const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        await socket.emit("send_msg", messageData);
        setMessageList((list) => [...list, messageData]);   //adds data to chat
        setCurrentMessage("");  //cls
        }
    };

    useEffect(() => {
        socket.on("receive_msg", (data) => {
        setMessageList((list) => [...list, data]);   //adds data to chat
        setCurrentChat(data.author);
        console.log(currentChat);
        });
        
    }, [socket, currentChat]);

    return (
        <div className="chatWindow">
            <div className="chatHeader">
                <p>Live Chat</p>        {/* change this to the other persons name */}
            </div>
            <div className="chatBody">
                <ScrollToBottom className="messageContainer">
                    {messageList.map((messageContent, index) => {
                        return (
                        <div
                            className="message"
                            id={username === messageContent.author ? "you" : "other"}
                            key={index}
                        >
                            <div>
                            <div className="messageContent">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="messageMeta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chatFooter">
                <input
                type="text"
                value={currentMessage}
                placeholder="Send message..."
                onChange={(event) => {
                    setCurrentMessage(event.target.value);
                }}
                onKeyDown={(event) => {
                    event.key === "Enter" && sendMsg();
                }}
                />
                <button onClick={sendMsg}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
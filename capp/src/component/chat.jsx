import React, { useEffect, useState } from 'react'
import { username } from './join'
import socketIO from 'socket.io-client'
import './chat.css'
let socket;
const ENDPOINT = 'http://localhost:4500/';
const Chat = () => {
    const [id, setid] = useState("");
    const send = () => {
        const message = document.getElementById('chat-inbox').value;
        socket.emit('message', { message, id })
        document.getElementById('chat-inbox').value = "";

    }
    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            alert("connected");
            setid(socket.id);
        })
        // console.log(socket);
        socket.emit('joined', { username });
        socket.on('welcome', (data) => {
            console.log(data.user, data.message);
        })
        socket.on('userJoined', (data) => {
            console.log(data.user, data.message);
        })
        socket.on('leave', (data) => {
            console.log(data.user, data.message);
        })
        return () => {
            socket.emit('userDisconnect');
            socket.off();
        }
    }, [])
    useEffect(() => {
        socket.on('sendMessage', (data) => {
            console.log(data.user, data.message);
        })
    }, [])
    return (
        <div className='chat-box'>
            <div className="chat">

                <div className="chat-head">

                </div>

                <div className="chat-input">
                    <input id='chat-inbox' type="text" />
                    <button onClick={send}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat

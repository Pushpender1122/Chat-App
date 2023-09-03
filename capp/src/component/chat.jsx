import React, { useEffect, useState } from 'react'
import { username } from './join'
import socketIO from 'socket.io-client'
import './chat.css'
import Message from './Message';
import Reactscroll from 'react-scroll-to-bottom'
let socket;
const ENDPOINT = 'http://localhost:4500/';
const Chat = () => {
    const [id, setid] = useState("");
    const [usermessage, setusermessage] = useState([]);
    const [name, setname] = useState('');
    const send = () => {
        const message = document.getElementById('chat-inbox').value;
        socket.emit('message', { message, id });
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
            setusermessage([...usermessage, data]);
            console.log(data.user, data.message);
            // console.log(data);
        })
        socket.on('userJoined', (data) => {
            setusermessage([...usermessage, data]);
            console.log(data.user, data.message);

        })
        socket.on('leave', (data) => {
            setusermessage([...usermessage, data]);
            console.log(data.user, data.message);
            // console.log(data);
        })
        return () => {
            socket.emit('userDisconnect');
            socket.off();
        }
    }, [])
    useEffect(() => {
        socket.on('userJoined', (data) => {
            setusermessage([...usermessage, data]);
            // console.log(data.user, data.message);

        })
        socket.on('leave', (data) => {
            setusermessage([...usermessage, data]);
            // console.log(data.user, data.message);
            // console.log(data);
        })
        socket.on('sendMessage', (data) => {
            setusermessage([...usermessage, data]);
            // console.log(data.user, data.message, data.id);
            // console.log(data);
            setname(data.user);
        })

        return () => {
            socket.off();
        }
    }, [usermessage])
    return (
        <div className='chat-box'>
            <div>
                <Reactscroll className="chat">
                    <div className="chat-head">
                    </div>
                    <div className="chat-text">
                        {/* {console.log(name)}; */}
                        {/* {console.log(usermessage.message)} */}
                        {usermessage?.map((item, i) => <Message message={item.message} classs={item.id === id ? 'right' : 'left'} user={item.id === id ? 'You' : item.user} key={i} />)}
                        {/* {usermessage?.map((item) => console.log(item))} */}
                        {/* <Message message={'hlo'} classs={'right'} /> */}
                    </div>
                </Reactscroll>
                <div className="chat-input">
                    <input id='chat-inbox' type="text " placeholder='Enter your message' onKeyUp={(e) => e.code === "Enter" ? send() : null} />
                    <button onClick={send}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat

import React from 'react'
import './join.css'
import logo from '../chat.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
let username;
const Join = () => {
    const [name, setname] = useState('');
    const setusername = () => {
        username = name;
    }
    // console.log(name);
    return (
        <div className='loginbox'>
            <div className="login">
                <img src={logo} alt="" />
                <h1>Chat App</h1>
                <form >
                    <input onChange={(e) => setname(e.target.value)} placeholder='Enter your name' type="text" />
                    <br />
                    <Link onClick={(e) => { name === "" ? e.preventDefault() : console.log('') }} to="/chat" >
                        <button onClick={setusername}>Login</button>
                    </Link>
                </form>

            </div>
        </div >
    )
}
export default Join
export { username }

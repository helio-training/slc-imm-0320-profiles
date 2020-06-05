import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { setToken } from '../../config/auth';

const style = {
    marginLeft : '3px',
    color: 'red'
}
// HandleSubmit saves to LocalStorage if remembered
// OnMount check LocalStorage for remembered Email
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remembered, setRemembered] = useState(false);
    const [msg, setMsg] = useState('');
    
    useEffect(() => {
        const localEmail = localStorage.getItem('email');
        if(localEmail){
            setEmail(localEmail);
            setRemembered(true);
        }
    }, [])

    const toggle = () => {
        setRemembered(!remembered);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setMsg('');
        if(remembered){
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }
        fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => {
            if(response.status === 200) {
                setToken(response.headers.get('authentication'));
                const redirComp = <Redirect to='/pokemon'/>
                setMsg(redirComp);
            } else{
                setMsg('Log In Failed');
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={email}
                placeholder="Email"
                onChange={({target}) => setEmail(target.value)}
                required/>
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}
                required/>
            <input 
                type="checkbox"  
                name="remember"
                checked={remembered}
                onChange={toggle} />
            <label for="remember">Remember Me</label>
            <input type="submit" value="Login"/>
            <span style={style}>{msg}</span>
        </form>
    )
}
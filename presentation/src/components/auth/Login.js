import React, { useState, useEffect } from 'react'

// HandleSubmit saves to LocalStorage if remembered
// OnMount check LocalStorage for remembered Username
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remembered, setRemembered] = useState(false);
    
    useEffect(() => {
        const localUsername = localStorage.getItem('username');
        if(localUsername){
            setUsername(localUsername);
            setRemembered(true);
        }
    }, [])

    const toggle = () => {
        setRemembered(!remembered);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password, remembered);
        if(remembered){
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username}
                placeholder="Username"
                onChange={({target}) => setUsername(target.value)}/>
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={({ target }) => setPassword(target.value)}/>
            <input 
                type="checkbox"  
                name="remember"
                checked={remembered}
                onChange={toggle} />
            <label for="remember">Remember Me</label>
            <input type="submit" value="Login"/>
        </form>
    )
}
import React, { useState, useEffect } from 'react';


// creating a component
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [profile, setProfile] = useState(null);
    
    // a function that will be called when the form is submitted
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({email: username, password}),
            });

            // if the response is ok, then we get the jwt token
            if (response.ok) {
                const data = await response.json();
                console.log("Parsed Response Data: ", data);
                setAccessToken(data.accessToken);
                setMessage("Login successful");
                fetchUserProfile(data.accessToken);
                // console.log("JWT: " + accessToken);
            } else {
                setMessage("Login Failed. Please check your credentials");
            }
        } catch(error) {
            console.error("Error: " + error);
            setMessage("An error occured. Please try again");
        }
    };

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/profile',{
                method: "GET",
                headers: {  
                    "Authorization": 'Bearer ' + token
                }, 
            });

            // if the response is ok, then we get the jwt token
            if (response.ok) {
                const data = await response.json();
                console.log("Parsed Response Data: ", data);
                setProfile(data);
                // console.log("JWT: " + accessToken);
            } else {
                setMessage('Failed to fetch profile');
            }
        } catch(error) {
            console.error("Error: " + error);
            setMessage("An error occured. Please try again");
        }
    };

    const handleLogout = () => {
        setUsername("");
        setPassword("");
        setAccessToken("");
        setProfile(null);
        setMessage("You have been logged out");
    }


    return (
        <div>
            <h2>Login</h2>
            {!profile ? (
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input 
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input 
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            ) : (
                <div>
                    <h3>User Profile</h3>
                    <p>Username: {profile.username}</p>
                    <p>Roles: {profile.roles.join(", ")}</p>
                    <p>Message: {profile.message}</p>
                    <button onClick={handleLogout}>Logout</button>

                </div>
            )}

            {message && <p>{message}</p>}   
            {accessToken && <p>{accessToken}</p>}
            
        </div>
    );

}

export default Login;
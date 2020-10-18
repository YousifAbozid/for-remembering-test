import React, {useState} from 'react'

const LoginForm = ({loginUser}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()

        const user = await loginUser({
          username, password,
        })
        // checks if the user successfuly logged in, so it only sets the username and the password to '' after successful
        // loging in, if not keep the data in the input field to not making the user typing everything again.
        if (user) {
            setUsername('')
            setPassword('')
        }
      }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>      
    )
}

export default LoginForm
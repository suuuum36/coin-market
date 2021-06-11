import {Button, TextField} from "@material-ui/core";
import {useEffect, useState} from 'react';
import { login } from './Api';

const LOGIN_KEY = 'LOGIN_KEY';

const LoginForm = ( {loginComplete} ) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        const { key } = await login(name, password);
        localStorage.setItem(LOGIN_KEY, key);
        loginComplete(name);
    }

    return (
        <div>
            <h3>Please Login</h3>
            <form className="login-form" noValidate autoComplete="off" onSubmit={onLogin}>
                <TextField size="small" id="filled-basic" label="ID" variant="filled" onChange={e=> setName(e.target.value)}/>
                <TextField size="small" id="filled-basic" label="password" variant="filled" type="password" onChange={e=> setPassword(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </div>
    );
}

export default LoginForm;
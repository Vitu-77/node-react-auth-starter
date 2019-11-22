import React, { useState, useContext, useEffect } from 'react';
import Api from '../src/services/Api';
import UserContext from '../src/global/contexts/UserContext';

const Login = () => {

    const { _setUser } = useContext(UserContext);

    const [username, setUsername] = useState('vitu_77');
    const [password, setPassword] = useState('123');

    const [persistLogged, setPersistLogged] = useState(false);
    const [loginError, setLoginError] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuthenticated = async () => await Api.isAuthenticated(setLoading, true);

        isAuthenticated();
    }, []);

    const handleChange = (event) => {
        const type = event.target.type;

        switch (type) {
            case 'text': setUsername(event.target.value);
                break;
            case 'password': setPassword(event.target.value);
                break;
            default: console.log(event.target);
                break;
        }
    }

    const submit = async () => {
        setLoading(true);
        await Api.authenticate(username, password, _setUser, setLoginError, persistLogged);
    }

    return (
        <React.Fragment>
            {
                loading
                    ? <h1>Loading...</h1>
                    :
                    <React.Fragment>
                        <form>
                            <input
                                type='text'
                                placeholder='username'
                                onChange={handleChange}
                                value={username}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                onChange={handleChange}
                                value={password}
                            />
                            Remember me
                            <input
                                type='checkbox'
                                onChange={() => setPersistLogged(!persistLogged)}
                            />
                            <button onClick={submit} type='button'>Submit</button>
                            {
                                loginError === 1 ? <span>AAAAA</span> : (
                                    loginError === 2 ? <span>NBBBBBB</span> : null
                                )
                            }
                        </form>
                    </React.Fragment>
            }
        </React.Fragment>

    )
}

export default Login;

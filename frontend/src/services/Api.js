import Cookies from 'js-cookie';
import Axios from 'axios';
import Router from 'next/router'

const Fetch = Axios.create({ 
    baseURL: `http://${'ApiIPGoesHere'}:${'ApiPortGoesHere'}` 
});

export default {
    async isAuthenticated(setLoading, isLoginPage) {

        const token = Cookies.get('AuthenticationTokenName');

        if (token === undefined || token === null || token === '') {
            isLoginPage ? setLoading(false) : Router.push('/login');
        }
        else {
            try {
                const response = await Fetch.get('/is_authenticated', {
                    headers: { token }
                });

                const { isAuthenticated } = response.data;

                if (!isAuthenticated) {
                    if (!isLoginPage) {
                        Router.push('/login');
                    }
                    else {
                        setLoading(false);
                    }
                }
                else {
                    if (isLoginPage) {
                        Router.push('/');
                    }
                    else {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log({ error });
            }
        }
    },

    async authenticate(username, password, _setUser, setLoginError, persistLogged) {
        const { data } = await Fetch.post('/authenticate', { username, password });

        const { user, auth, error } = data;

        if (!error) {
            const { name, id, acess_level, avatar_src } = user;
            const userCookie = `${name.replace(" ", "#")}$${username}$${id}$${avatar_src}$${acess_level}`;

            await _setUser(name, username, id, acess_level, avatar_src);

            if (persistLogged) {
                Cookies.set('DICAST_AUTH_TOKEN', auth, { expires: 50000 });
                Cookies.set('USER', userCookie, { expires: 50000 });
                //TODO colocar o resto das infos nos cookies
            }
            else {
                Cookies.set('DICAST_AUTH_TOKEN', auth);
                Cookies.set('USER', userCookie);
                //TODO colocar o resto das infos nos cookies
            }

            Router.push('/');
        }
        else {
            switch (error) {
                case 'user not found': setLoginError(1);
                    break;
                case 'invalid password': setLoginError(2);
                    break;
                default: setLoginError(1);
                    break;
            }
        }
    },
}

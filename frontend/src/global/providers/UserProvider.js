import React, { useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';

const UserProvider = ({ children }) => {

    const [user, _setUser] = useState();

    const initUser = async () => {
        const userCookie = Cookies.get('USER');

        if (userCookie) {
            const userAttrs = userCookie.split('$');

            _setUser({
                name: userAttrs[0].replace('#', ' '),
                username: userAttrs[1],
                id: userAttrs[2],
                userAvatar: userAttrs[3].replace('localhost', '192.168.1.6'),
                acessLevel: userAttrs[4],
            });
        }
    }

    const showUser = () => console.log(user);

    return (
        <UserContext.Provider value={{ user, showUser, initUser, _setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
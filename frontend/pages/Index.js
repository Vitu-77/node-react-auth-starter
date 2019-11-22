import React, { useEffect, useState, useContext } from 'react';
import Api from '../src/services/Api';

import Podcasts from '../src/components/Podcasts/Podcasts';
import UserContext from '../src/global/contexts/UserContext';

const Index = () => {

    const { user, initUser } = useContext(UserContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initUser();
        const isAuthenticated = async () => await Api.isAuthenticated(setLoading, false);

        isAuthenticated();
    }, []);

    return (
        <React.Fragment>
            {
                loading
                    ? <h1>Loading...</h1>
                    : (
                        <div>
                            <h1>{user.name}</h1>
                            <h4>{user.username}</h4>
                            <h4>{user.id}</h4>
                            <h4>{user.userAvatar}</h4>
                            <img style={{
                                'borderRadius': '100%'
                            }} width='300px' src={user.userAvatar} alt={user.name} />
                            {user.acess_level === 2 ? <button>New Podcast</button> : null}
                            <Podcasts />
                        </div>
                    )
            }
            <a href='/redirect'>link</a>
        </React.Fragment>
    );
}

export default Index;
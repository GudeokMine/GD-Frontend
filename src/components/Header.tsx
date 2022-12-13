import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.scss';

const Header = () => {
    const [onlineUser, setOnlineUser] = useState(0);

    const countOnlineUser = () => {
        axios.get('https://gdmine.kro.kr:1211/mcServer')
            .then((res) => {
                if (onlineUser !== res.data.msg) {
                    setOnlineUser(res.data.msg)
                }
                return;
            })
            .catch((err) => {
                return;
            })
        return;
    }

    useEffect(() => {
        countOnlineUser();
        setInterval(countOnlineUser, 10000);
    }, []);

    return (
        <div className='header-wrap'>
            <div className='title'>
                <Link to='/' className='title-text'>minecraft</Link>
            </div>
            <div className='user-in'>
                <span>{onlineUser} users in server</span>
            </div>
        </div>
    );
};

export default Header;
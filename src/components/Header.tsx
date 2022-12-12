import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.scss';

const Header = () => {
    return (
        <div className='header-wrap'>
            <div className='title'>
                <Link to='/' className='title-text'>minecraft</Link>
            </div>
            <div className='user-in'>
                <span>3 users in server</span>
            </div>
        </div>
    );
};

export default Header;
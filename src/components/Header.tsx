import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.scss';
import { FiDownload } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { AiFillGithub } from "react-icons/ai";

const Header = () => {
    const [onlineUser, setOnlineUser] = useState(0);

    const countOnlineUser = () => {
        axios.get('https://gdmine.kro.kr:1211/mcServer')
            .then((res) => {
                if (onlineUser !== res.data.msg)
                    setOnlineUser(res.data.msg)
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
            <div>
                <a href='https://discord.gg/WtdxfdFcGT' target="_blank">
                    <SiDiscord className='discord' size='25'></SiDiscord>
                </a>
                <FiDownload className='filedownload' size='24'/>
                <a href='https://github.com/GudeokMine' target="_blank"><AiFillGithub className='github' size='25'/></a>
                <div className='user-in'>
                    <span>{onlineUser} users in server</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
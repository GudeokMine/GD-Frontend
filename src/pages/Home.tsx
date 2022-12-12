import React from 'react';
import Header from '../components/Header';
import '../style/Home.scss'

const Home = () => {
    return (
        <div className='home-wrap'>
            <Header />
            <div className='title-wrap'>
                <span>GUDEOK MINE SERVER</span>
                <div>
                    <div>
                        <input />학년
                        <input />반
                        <input className='student-no' />번
                        <span></span>
                    </div>
                    <div>
                        <input
                            value={'2022057@gudeok.hs.kr'}
                            disabled
                            className='email'
                        />
                    </div>
                    <div>
                        <input placeholder='닉네임을 입력하세요' className='player-name' />
                    </div>
                    <div className='submit'>
                        {'>'}
                    </div>
                </div>
                <button>타학교에 재학 중이신가요?</button>
            </div>
        </div>
    );
};

export default Home;
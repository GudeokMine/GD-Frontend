import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../style/Home.scss'

const Home = () => {
    const [isGudeok, setIsGudeok] = useState(true);
    const [gudeokMail, setGudeokMail] = useState('@gudeok.hs.kr');
    const [grade, setGrade] = useState();
    const [classNo, setClassNo] = useState();
    const [studentNo, setStudentNo] = useState();
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [school, setSchool] = useState([]);
    const [userSchool, setUserSchool] = useState();
    const [pin, setPin] = useState('');

    const [nickname, setNickname] = useState('');
    const [studentMail, setStudentMail] = useState('');

    useEffect(() => {
        axios.get('https://gdmine.kro.kr:1211/foreignSchools')
            .then((res) => { setSchool(res.data.msg) })
    }, []);

    const onClickChangeSchool = () => {
        setIsGudeok(isGudeok => !isGudeok);
    }

    const onClickSubmitData = async () => {
        if (isGudeok) {
            try {
                await axios.post(`https://gdmine.kro.kr:1211/requestVerify?username=${nickname}&grade=${grade}&class=${classNo}&number=${studentNo}`)
                    .then((res) => {
                        setIsAuthentication(true);
                        alert('이메일로 인증핀이 발송되었습니다.');
                    })
            } catch (err: any) {
                if (err.response.status >= 500
                    || err.response.data.msg === 'undefined'
                ) {
                    alert(err.response.data.msg)
                } else if (err.response.status === 400) {
                    alert(err.response.data.msg)
                }
            }
        } else {
            try {
                await axios.post(`https://gdmine.kro.kr:1211/foreignVerify?username=${nickname}&guild=${userSchool}`)
                    .then((res) => {
                        setIsAuthentication(true);
                        alert('이메일로 인증핀이 발송되었습니다.');
                    })
            } catch (err: any) {
                if (err.response.status >= 500
                    || err.response.data.msg === 'undefined'
                ) {
                    alert(err.response.data.msg)
                } else if (err.response.status === 400) {
                    alert(err.response.data.msg)
                }
            }
        }
    }

    const onClickVerifySubmitData = async () => {
        try {
            if (isGudeok) {
                await axios.post(`https://gdmine.kro.kr:1211/verify?username=${nickname}&email=${gudeokMail}&pin=${pin}`)
                    .then((res) => {
                        alert('인증 되었습니다!');
                    })
                    .catch((err) => {
                        alert(err.response.data.msg)
                    })
            } else {
                await axios.post(`https://gdmine.kro.kr:1211/verify?username=${nickname}&email=${studentMail}&pin=${pin}`)
                    .then((res) => {
                        alert('인증 되었습니다!');
                    })
                    .catch((err) => {
                        alert(err.response.data.msg)
                    })
            }
        } catch (err: any) {
            alert(err.response.data.msg)
        }
    }

    useEffect(() => {
        if (studentNo as unknown as number <= 9) {
            setGudeokMail(`2022${grade || ''}${classNo || ''}0${studentNo || ''}@gudeok.hs.kr`);
        } else {
            setGudeokMail(`2022${grade || ''}${classNo || ''}${studentNo || ''}@gudeok.hs.kr`);
        }
    }, [grade, classNo, studentNo, setGrade, setClassNo, setStudentNo]);

    return (
        <div className='home-wrap'>
            <Header />
            <div className='title-wrap'>
                <span>GUDEOK MINE SERVER</span>
                {isGudeok ?
                    <>
                        <div>
                            <div>
                                <input
                                    type='text'
                                    onChange={(e: any) => { setGrade(e.target.value) }}
                                    value={grade}
                                />학년
                                <input
                                    type='text'
                                    onChange={(e: any) => { setClassNo(e.target.value) }}
                                    value={classNo}
                                />반
                                <input className='student-no'
                                    type='text'
                                    onChange={(e: any) => { setStudentNo(e.target.value) }}
                                    value={studentNo}
                                />번
                                <span></span>
                            </div>
                            <div>
                                <input
                                    type='text'
                                    value={gudeokMail}
                                    disabled
                                    className='email'
                                />
                            </div>
                            <div>
                                <input
                                    type='text'
                                    onChange={(e: any) => { setNickname(e.target.value) }}
                                    value={nickname}
                                    placeholder='닉네임을 입력하세요'
                                    className='player-name' />
                            </div>
                        </div>
                        <div className='submit'
                            onClick={onClickSubmitData}
                        >
                            Submit
                        </div>
                        <button
                            onClick={onClickChangeSchool}
                        >타학교에 재학 중이신가요?</button>
                    </>
                    :
                    <>
                        <div>
                            <div className='select-wrap'>
                                <select
                                    onChange={(e: any) => { setUserSchool(e.target.value) }}
                                    value={userSchool}
                                >
                                    {school.map((data, index) => (
                                        <option
                                            key={index}
                                        >{data}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    onChange={(e: any) => { setStudentMail(e.target.value) }}
                                    value={studentMail}
                                    className='email'
                                    type='text'
                                    placeholder='이메일을 입력하세요'
                                />
                            </div>
                            <div>
                                <input
                                    onChange={(e: any) => { setNickname(e.target.value) }}
                                    value={nickname}
                                    placeholder='닉네임을 입력하세요'
                                    type='text'
                                    className='player-name'
                                />
                            </div>
                        </div>
                        <div className='submit'
                            onClick={onClickSubmitData}
                        >
                            SUBMIT
                        </div>
                        <button
                            onClick={onClickChangeSchool}
                        >구덕고에 재학 중이신가요?</button>
                    </>
                }
                {isAuthentication ?
                    <div className='pin-wrap'>
                        <input
                            onChange={(e: any) => { setPin(e.target.value) }}
                            value={pin}
                            className='pin-input'
                            type='text'
                            placeholder='인증 핀 입력'
                        />
                        <button onClick={onClickVerifySubmitData}>
                            인증
                        </button>
                    </div>
                    : ''}
            </div>
        </div>
    );
};

export default Home;
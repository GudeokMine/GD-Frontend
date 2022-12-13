import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../style/Home.scss'

const Home = () => {
    /* check gudeok school */
    const [isGudeok, setIsGudeok] = useState(true);
    const [gudeokMail, setGudeokMail] = useState('@gudeok.hs.kr');

    /* gudeok verify data */
    const [grade, setGrade] = useState('');
    const [classNo, setClassNo] = useState('');
    const [studentNo, setStudentNo] = useState('');

    /* foreign school */
    const [school, setSchool] = useState([]);

    /* foreign verify data */
    const [userSchool, setUserSchool] = useState('');
    const [nickname, setNickname] = useState('');
    const [studentMail, setStudentMail] = useState('');

    /* 구덕 고등학교 확인 */
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [pin, setPin] = useState('');

    useEffect(() => {
        axios.get('https://gdmine.kro.kr:1211/foreignSchools').then((res) => { setSchool(res.data.msg) })
    }, []);

    const onClickChangeSchool = () => {
        setIsGudeok(isGudeok => !isGudeok);
    }

    const onClickSubmitData = async () => {
        if (isGudeok) {
            try {
                await axios.post(`https://gdmine.kro.kr:1211/requestVerify?username=${nickname}&grade=${grade}&class=${classNo}&number=${studentNo}`)
                    .then(() => {
                        setIsAuthentication(true);
                        alert('이메일로 인증핀이 발송되었습니다.');
                    })
            } catch (err: any) {
                alert(err.response.data.msg)
                return;
            }
        } else {
            try {
                await axios.post(`https://gdmine.kro.kr:1211/foreignVerify?username=${nickname}&guild=${userSchool}`)
                    .then(() => {
                        setIsAuthentication(true);
                        alert('이메일로 인증핀이 발송되었습니다.');
                    })
            } catch (err: any) {
                alert(err.response.data.msg)
                return;
            }
        }
    }

    const onClickVerifySubmitData = async () => {
        try {
            if (isGudeok) {
                await axios.post(`https://gdmine.kro.kr:1211/verify?username=${nickname}&email=${gudeokMail}&pin=${pin}`)
                    .then(() => {
                        alert('인증 되었습니다!');
                    })
                    .catch((err) => {
                        alert(err.response.data.msg)
                    })
            } else {
                await axios.post(`https://gdmine.kro.kr:1211/verify?username=${nickname}&email=${studentMail}&pin=${pin}`)
                    .then(() => {
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
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setGrade(e.target.value) }}
                                    value={grade}
                                />학년
                                <input
                                    type='text'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setClassNo(e.target.value) }}
                                    value={classNo}
                                />반
                                <input
                                    className='student-no'
                                    type='text'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setStudentNo(e.target.value) }}
                                    value={studentNo}
                                />번
                                <span></span>
                            </div>
                            <div>
                                <input
                                    type='text'
                                    value={gudeokMail}
                                    disabled
                                    className='email' />
                            </div>
                            <div>
                                <input
                                    type='text'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNickname(e.target.value) }}
                                    value={nickname}
                                    placeholder='닉네임을 입력하세요'
                                    className='player-name' />
                            </div>
                        </div>
                        <div className='submit' onClick={onClickSubmitData}>SUBMIT</div>
                        <button onClick={onClickChangeSchool}>타학교에 재학 중이신가요?</button>
                    </>
                    :
                    <>
                        <div>
                            <div className='select-wrap'>
                                <select
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { setUserSchool(e.target.value) }}
                                    value={userSchool}>
                                    {school.map((data, index) => (
                                        <option
                                            key={index}
                                        >{data}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setStudentMail(e.target.value) }}
                                    value={studentMail}
                                    className='email'
                                    type='text'
                                    placeholder='이메일을 입력하세요' />
                            </div>
                            <div>
                                <input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNickname(e.target.value) }}
                                    value={nickname}
                                    placeholder='닉네임을 입력하세요'
                                    type='text'
                                    className='player-name' />
                            </div>
                        </div>
                        <div className='submit' onClick={onClickSubmitData}>SUBMIT</div>
                        <button
                            onClick={onClickChangeSchool}
                        >구덕고에 재학 중이신가요?</button>
                    </>}
                {isAuthentication ?
                    <div className='pin-wrap'>
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setPin(e.target.value) }}
                            value={pin}
                            className='pin-input'
                            type='text'
                            placeholder='인증 핀 입력' />
                        <button onClick={onClickVerifySubmitData}>인증</button>
                    </div> : ''}
            </div>
        </div>
    );
};

export default Home;
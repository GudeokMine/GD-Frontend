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

    const [nickname, setNickname] = useState('');
    const [studentMail, setStudentMail] = useState('');

    useEffect(() => {
        axios.get('https://gdmine.kro.kr:1211/foreignSchools')
            .then((res) => {
                console.log(res)
            })
    }, []);

    const onClickChangeSchool = () => {
        setIsGudeok(isGudeok => !isGudeok);
    }

    const onClickSubmitData = async () => {
        try {
            await axios.post('https://gdmine.kro.kr:1211/requestVerify',
                {
                    username: nickname,
                    grade: grade as unknown as number,
                    class: classNo as unknown as number,
                    number: studentNo as unknown as number,
                    email: studentMail
                })
                .then((res) => {
                    if (res.data) {
                        setIsAuthentication(true);
                        alert('이메일로 인증핀이 발송되었습니다.');
                    } else {
                        alert('오류가 발생했습니다. 입력란을 다시 확인해주세요.');
                    }
                })
        } catch (err) {
            console.log(err)
            alert('오류가 발생했습니다.');
        }
    }

    useEffect(() => {
        setGudeokMail(`2022${grade || ''}${classNo || ''}${studentNo || ''}@gudeok.hs.kr`);
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
                                    onChange={(e: any) => { setGrade(e.target.value) }}
                                    value={grade}
                                />학년
                                <input
                                    onChange={(e: any) => { setClassNo(e.target.value) }}
                                    value={classNo}
                                />반
                                <input className='student-no'
                                    onChange={(e: any) => { setStudentNo(e.target.value) }}
                                    value={studentNo}
                                />번
                                <span></span>
                            </div>
                            <div>
                                <input
                                    value={gudeokMail}
                                    disabled
                                    className='email'
                                />
                            </div>
                            <div>
                                <input
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
                            <div>
                                <input
                                    onChange={(e: any) => { setStudentMail(e.target.value) }}
                                    value={studentMail}
                                    className='email'
                                    placeholder='이메일을 입력하세요'
                                />
                            </div>
                            <div>
                                <input
                                    onChange={(e: any) => { setNickname(e.target.value) }}
                                    value={nickname}
                                    placeholder='닉네임을 입력하세요'
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
                <input />
            </div>
        </div>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import '../../Assets/styles/workout.css';
import '../../Assets/styles/style.css';
import '../../Assets/styles/utility.css';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Avatar, Menu, Dropdown, Button, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, SolutionOutlined, LockOutlined, TranslationOutlined, PoweroffOutlined } from '@ant-design/icons';
import { removeTokenFromCookie } from '../../hooks/cookies';

function Workout() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEx, setOpenEx] = useState(false);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [data, setData] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [quizData, setQuizData] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/quiz')
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleFinish = () => {
        axios
            .post('http://localhost:3000/quiz/store_option', {
                data: selectedAnswer,
            })
            .then((res) => {
                if (res.headers['content-type'] === 'application/json') {
                    return res.json();
                }
                const exercises = res.data;
                setExercise(exercises);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { qId, questions, answers } = data[currentQuestion] || {};

    const showModal = () => {
        setOpen(true);
    };

    const showExercise = (e) => {
        console.log('63:', e);
        setSelectedExercise(e);
        setOpenEx(true);
    };

    const handleOk = () => {
        setLoading(true);

        setOpen(false);
        setOpenEx(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setOpenEx(false);
    };
    const onClickNext = () => {
        if (currentQuestion < data.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswerIndex(null);
        } else if (currentQuestion === data.length - 1) {
            handleFinish();
            handleCancel();
        }
    };

    const onclickBack = () => {
        if (currentQuestion < data.length && currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            handleCancel();
        }
    };

    const onAnswerSelected = (answer, index) => {
        setQuizData(answer);
        setSelectedAnswerIndex(index);
        const newItem = {
            question: questions,
            answer: answer,
        };
        if (newItem.question && newItem.answer) {
            // setSelectedAnswer([...selectedAnswer, newItem.question]);
            setSelectedAnswer((prev) => ({ ...prev, [newItem.question]: newItem.answer }));
        }
    };

    let navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const logOut = () => {
        removeTokenFromCookie();
        console.log('LogOut Successfully');
        navigate('/');
    };
    const profileItems = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    profile
                </a>
            ),
            icon: <SolutionOutlined />,
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer">
                    setting
                </a>
            ),
            icon: <LockOutlined />,
        },

        {
            key: '3',
            label: isLogin ? (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        navigate('/login');
                        setIsLogin(true);
                    }}
                >
                    sign in
                </a>
            ) : (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        logOut();

                        setIsLogin(false);
                        navigate('/login');
                    }}
                >
                    sign out
                </a>
            ),
            icon: <PoweroffOutlined />,
        },
    ];
    return (
        <>
            <header id="header-inner">
                <div className="container">
                    <nav id="main-nav">
                        <img
                            src="https://www.erixlogan.com/wp-content/uploads/2019/10/DB-Logo-For-White-Background-300x228.png"
                            alt=""
                            id="logo"
                        />
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href className="current">
                                    Program
                                </a>
                            </li>
                            <li>
                                <a href>About</a>
                            </li>
                            <li className="drop">
                                <Dropdown menu={{ items: profileItems }}>
                                    <Avatar icon={<UserOutlined />} />
                                </Dropdown>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Button className="btn btn-create" type="primary" onClick={showModal}>
                New Workout
            </Button>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={onclickBack}>
                        Return
                    </Button>,
                    <Button className="btn" onClick={onClickNext}>
                        {currentQuestion === data.length - 1 ? 'Finish' : 'Next'}
                    </Button>,
                ]}
            >
                <div className="quiz-container">
                    <h1>Quiz {currentQuestion + 1}</h1>
                    <p>{questions}</p>
                    <ul>
                        {answers
                            ? answers.map((a, index) => {
                                  return (
                                      <li
                                          onClick={() => onAnswerSelected(a.answer, index)}
                                          key={index}
                                          className={selectedAnswerIndex === index ? 'selected-answer' : null}
                                      >
                                          {a.answer}
                                      </li>
                                  );
                              })
                            : ''}
                    </ul>
                </div>
            </Modal>
            {/* workout item */}
            <section id="workout-items" class="py-2">
                <div class="container-grid">
                    <div class="workouts-container">
                        {exercise
                            ? exercise.map((ex, exkey) => {
                                  return (
                                      <div key={exkey}>
                                          {ex.mode_workouts[exkey]
                                              ? ex.mode_workouts.map((m, mkey) => {
                                                    return (
                                                        <div className="group-card" key={mkey}>
                                                            {m.exercises[mkey]
                                                                ? m.exercises.map((e, key) => {
                                                                      return (
                                                                          <div class="card" key={key}>
                                                                              <img
                                                                                  src="https://cdn.pixabay.com/photo/2017/08/07/14/02/man-2604149_1280.jpg"
                                                                                  alt=""
                                                                              />
                                                                              <h1>{e.exName}</h1>

                                                                              <Button onClick={() => showExercise(e)}>
                                                                                  Detail
                                                                              </Button>
                                                                          </div>
                                                                      );
                                                                  })
                                                                : ''}
                                                            <Modal
                                                                title="Exercise Detail"
                                                                open={openEx}
                                                                onOk={handleOk}
                                                                onCancel={handleCancel}
                                                            >
                                                                <div>
                                                                    <div class="category category-gaine">
                                                                        {selectedExercise?.muscleGroup.join('-')}
                                                                    </div>
                                                                    <h3>
                                                                        <h1>{selectedExercise?.exName}</h1>
                                                                        <p>{selectedExercise?.description}</p>
                                                                    </h3>
                                                                </div>
                                                            </Modal>
                                                        </div>
                                                    );
                                                })
                                              : ''}
                                      </div>
                                  );
                              })
                            : ''}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Workout;

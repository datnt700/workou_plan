import React, { useState } from 'react';

import '../../Assets/styles/main.css';
import { Avatar, Menu, Dropdown, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, SolutionOutlined, LockOutlined, TranslationOutlined, PoweroffOutlined } from '@ant-design/icons';
import { removeTokenFromCookie } from '../../hooks/cookies';
import Login from '../auth/login';
function Home({ login }) {
    let navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isLogout, setIsLogout] = useState(true);

    console.log(isLogin);
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
                        setIsLogin(false);
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
                        setIsLogin(true);
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
            <header id="header-home">
                <div className="container">
                    <nav id="main-nav">
                        <img
                            src="https://www.erixlogan.com/wp-content/uploads/2019/10/DB-Logo-For-White-Background-300x228.png"
                            alt=""
                            id="logo"
                        />
                        <ul>
                            <li>
                                <a href className="current">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="http://localhost:3001/workout">Program</a>
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
            {/* Section A: Specialize */}
            <section id="home-a" className="text-center py-2">
                <div className="container">
                    <h2 className="section-title">Together, we create</h2>
                    <div className="bottom-line" />
                    <p className="lead">the most perfect, relevant and effective training program. </p>
                    <div className="specials">
                        <div>
                            <i className="fas fa-person fa-2x" />
                            <h3>Work out with celebrity trainers</h3>
                            <p>
                                Work out anywhere with celebs and world-class trainers who will motivate you to reach
                                your goals.
                            </p>
                        </div>
                        <div>
                            <i className="fas fa-trophy fa-2x" />
                            <h3>Take your wellness to the next level</h3>
                            <p>Be more active and reach your goals with custom fitness programs.</p>
                        </div>
                        <div>
                            <i className="fas fa-file-alt fa-2x" />
                            <h3>Exclusive guided courses</h3>
                            <p>
                                Get access to courses targeting health and chronic conditions including diabetes, heart
                                health, MSK, fall prevention, sleep and more.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section B: Stats */}
            <section id="home-b" class="text-center py-2">
                <div class="stats">
                    <div>
                        <ul>
                            <li>
                                <i class="fas fa-users fa-3x"></i>
                            </li>
                            <li class="stats-title">Clients</li>
                            <li class="stats-number">1000</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <i class="fas fa-award fa-3x"></i>
                            </li>
                            <li class="stats-title">Award</li>
                            <li class="stats-number">3</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <i class="fa-sharp fa-solid fa-newspaper fa-3x"></i>
                            </li>
                            <li class="stats-title">Program</li>
                            <li class="stats-number">234</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* Section C: Specialize */}
            <section id="home-c" class="text-center py-2">
                <div class="container">
                    <h2 class="section-title">My Creative Process</h2>
                    <div class="bottom-line"></div>
                    <p class="lead">Unlimited access to the world’s best workouts, meditation, nutrition and more</p>
                    <div class="process">
                        <div>
                            <i class="fas fa-comment fa-4x  process-icon my-2">
                                <div class="process-step">1</div>
                            </i>

                            <h3>What is your fitness's goals?</h3>
                            <p>We want to know what brought you here?</p>
                        </div>
                        <div>
                            <i class="fas fa-question fa-4x process-icon my-2">
                                <div class="process-step">2</div>
                            </i>
                            <h3>How often do you take part in physical exercise?</h3>
                            <p>we want to know your activity frequency</p>
                        </div>
                        <div>
                            <i class="fas fa-star fa-4x process-icon my-2">
                                <div class="process-step">3</div>
                            </i>
                            <h3>Whats the activity level at your job??</h3>
                            <p>and frequency of activity in your work</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;

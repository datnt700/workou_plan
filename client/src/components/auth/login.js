import React, { useEffect, useState } from 'react';

import '../../Assets/styles/login.css';
import axios from 'axios';
import { saveTokenToCookie } from '../../hooks/cookies';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');

    const navigate = useNavigate();

    const onFinish = (values) => {
        setEmail(values.email);
        setPassword(values.password);
        handleLogin(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleLogin = async (values) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                email: values.email,
                password: values.password,
            });

            console.log('39', res.data);

            setLogin(res);

            setEmail('');
            setPassword('');
            navigate('/');
            saveTokenToCookie(res.data.refreshToken);
            console.log('token Successfully', res.data.refreshToken);
            setLogin(res.data.refreshToken);
            console.log('Login Successfully', res);
        } catch (error) {
            console.log('Login Failed:', error);
        }
    };

    return (
        <>
            <div className="login-box">
                <Form
                    className="login-form"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p className="form-title">Welcome back</p>
                    <p>Login to your world</p>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item
                        className="login-form-submit"
                        onClick={() => {
                            console.log('azeraz');
                        }}
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button className="login-form-button" type="primary" htmlType="submit">
                            Login
                        </Button>
                        <span>Or </span>
                        <a href="http://localhost:3001/register" className="login-form-register">
                            register now!
                        </a>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;

import React, { useEffect, useState } from 'react';
import '../../Assets/styles/style.css';
import '../../Assets/styles/utility.css';
import '../../Assets/styles/login.css';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const RegistrationForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const onFinish = (values) => {
        handleRegister(values);
        setEmail(values.email);
        setPassword(values.password);

        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleRegister = async (values) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/register', {
                email: values.email,
                password: values.password,
            });

            setEmail('');
            setPassword('');
            navigate('/login');
            console.log('Resgister Successfully', res);
        } catch (error) {
            console.log('Resgister Failed:', error);
        }
    };

    return (
        <Form
            className="login-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinishFailed={onFinishFailed}
        >
            <p className="form-title">Welcome newbie</p>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please enter your password' },
                    { min: 6, message: 'Password must be at least 6 characters' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item className="login-form-submit" wrapperCol={{ offset: 8, span: 16 }}>
                <Button className="login-form-button" type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

function Register() {
    return (
        <>
            <div className="login-box">
                <RegistrationForm />
            </div>
        </>
    );
}

export default Register;

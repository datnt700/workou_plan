import React from 'react';

import Cookies from 'js-cookie';

export const saveTokenToCookie = (token) => {
    Cookies.set('token', token, { expires: 1 });
};

// Lấy token từ cookie
export const getTokenFromCookie = () => {
    return Cookies.get('token');
};

// Xóa token từ cookie
export const removeTokenFromCookie = () => {
    Cookies.remove('token');
};

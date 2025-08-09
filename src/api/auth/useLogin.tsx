// src/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// LoginResponse 타입 정의
export type LoginResponse = {
    token: string;
    refreshToken: string;
};

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,  // 기본 API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터: 요청 전에 로그를 찍기
axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', config);  // 요청 로그 출력
        return config;
    },
    (error) => {
        console.error('Request Error:', error);  // 요청 에러 로그 출력
        return Promise.reject(error);
    }
);

// 응답 인터셉터: 응답 후 로그를 찍기
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);  // 응답 로그 출력
        return response;
    },
    (error) => {
        console.error('Response Error:', error);  // 응답 에러 로그 출력
        return Promise.reject(error);
    }
);

// 로그인 API 호출 함수
const loginUser = async (variables: { email: string; password: string }): Promise<LoginResponse | null> => {
    const { email, password } = variables;

    try {
        // 로그인 요청
        const res = await axiosInstance.post('/auth/login', { email, password });

        if (!res.data.success) {
            console.error('Login failed:', res.data.error);
            alert('로그인 실패');
            return null;
        }

        const accessToken = res.data.data?.token;
        const refreshToken = res.data.data?.refreshToken;

        if (!accessToken || !refreshToken) {
            alert('토큰 응답이 올바르지 않습니다.');
            return null;
        }

        return { token: accessToken, refreshToken };
    } catch (error) {
        console.error('Error during login:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        return null;
    }
};

// useMutation을 사용하여 로그인 요청 처리
export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
    });
};
// src/lib/apiClient.ts
import axios from 'axios';
import { useAuthStore } from "@/store/authStore";  // Zustand 스토어

// 기본 Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,  // 기본 API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// axios 요청 함수
// @ts-ignore
export const sendRequest = async (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, data: any = null) => {
    const { accessToken, refreshToken } = useAuthStore.getState();

    try {
        // 공통 요청 헤더 설정
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        let res;

        // 각 메소드에 맞는 axios 요청
        if (method === 'GET') {
            res = await axiosInstance.get(url, { headers });
        } else if (method === 'POST') {
            res = await axiosInstance.post(url, data, { headers });
        } else if (method === 'PUT') {
            res = await axiosInstance.put(url, data, { headers });
        } else if (method === 'PATCH') {
            res = await axiosInstance.patch(url, data, { headers });
        } else if (method === 'DELETE') {
            res = await axiosInstance.delete(url, { headers });
        }

        // 요청이 성공하면 응답 데이터 반환
        // @ts-ignore
        return {
            success: true,
            data: res.data,
            error: null,
        };
    } catch (error: any) {
        // 서버 오류 (500 상태 코드)
        if (error.response) {
            if (error.response.status === 500) {
                console.error("Server error:", error.response.data);
                return {
                    success: false,
                    data: null,
                    error: {
                        code: "SERVER_ERROR",
                        message: "서버에서 문제가 발생했습니다. 나중에 다시 시도해주세요.",
                    },
                };
            }

            // 401 에러 발생 시 accessToken 갱신 시도
            if (error.response?.status === 401) {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    // 갱신된 토큰으로 재시도
                    return sendRequest(method, url, data);
                }
            }

            // 그 외의 HTTP 오류 처리
            console.error("Request failed with status:", error.response.status);
            return {
                success: false,
                data: null,
                error: {
                    code: "REQUEST_FAILED",
                    message: error.response?.data?.message || "Request failed",
                },
            };
        }

        // 네트워크 오류나 기타 예외 처리
        console.error("Network or other error:", error);
        return {
            success: false,
            data: null,
            error: {
                code: "UNKNOWN_ERROR",
                message: "알 수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요.",
            },
        };
    }
};

// 리프레시 토큰을 이용하여 accessToken 갱신
export const refreshAccessToken = async (): Promise<string | null> => {
    const { refreshToken } = useAuthStore.getState();

    try {
        const res = await axiosInstance.post("/auth/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const newAccessToken = res.data.data?.token;
        if (newAccessToken) {
            useAuthStore.getState().setAccessToken(newAccessToken);  // 새로운 액세스 토큰을 Zustand에 저장
            return newAccessToken;
        }
    } catch (error) {
        console.error("Token refresh failed:", error);
        return null;
    }

    return null;
};
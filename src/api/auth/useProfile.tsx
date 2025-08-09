import { useMutation } from '@tanstack/react-query';
import { sendRequest } from "@/api/apiClient";  // apiClient 임포트

export type ProfileRequest = {
    userName: string;
    introduction: string;
};

// 프로필 제출 함수
const submitProfile = async (profile: ProfileRequest) => {
    try {
        const response = await sendRequest('POST', '/user/profile', profile);
        return response.data;
    } catch (error) {
        console.error("Error during profile submission:", error);
        throw error;  // 에러를 다시 던져서 `useMutation`에서 처리할 수 있게 함
    }
};

// useMutation을 사용하여 프로필 제출 요청 처리
export const useProfile = () => {
    return useMutation({
        mutationFn: submitProfile,
    });
};
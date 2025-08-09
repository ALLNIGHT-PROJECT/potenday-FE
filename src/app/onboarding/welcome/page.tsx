'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { loginUser } from "@/features/onboarding/api";
import {useLogin} from "@/api/auth/loginApi";

export default function OnboardingWelcomePage() {
    const router = useRouter();
    const setTokens = useAuthStore((state) => state.setTokens);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: login, isError, isSuccess } = useLogin();

    const handleLogin = () => {
        // loginUser에 email, password를 전달하는 방식으로 변경
        login({ email, password }, {
            onSuccess: (data) => {
                if (data) {
                    // 로그인 성공 시 토큰 저장
                    setTokens({ accessToken: data.token, refreshToken: data.refreshToken });
                    router.replace('/onboarding/profile');
                }
            },
            onError: () => {
                alert('로그인 실패');
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            {/* 메인 헤드라인 */}
            <h1 className="title-2 text-common-0 text-center mb-2">
                막막함에서 벗어나, 당장 실행부터 할 수 있어요
            </h1>

            {/* 서브텍스트 */}
            <p className="headline-2 text-coolNeutral-750 text-center mb-8">
                이메일로 로그인하세요
            </p>

            {/* 이메일 입력 */}
            <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-sm px-4 py-3 mb-4 border border-coolNeutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* 비밀번호 입력 */}
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full max-w-sm px-4 py-3 mb-6 border border-coolNeutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* 로그인 버튼 */}
            <button
                className="w-full max-w-sm px-4 py-3 rounded-lg bg-primary text-common-100 body-3-700 shadow-md"
                onClick={handleLogin}
            >
                로그인
            </button>
        </div>
    );
}
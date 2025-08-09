'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import {useLogin} from "@/api/auth/useLogin";
import {useAuthStore} from "@/store/authStore";

export default function OnboardingWelcomePage() {
    const router = useRouter();
    const setTokens = useAuthStore((state) => state.setTokens);
    const { mutate: login } = useLogin();


    const handleNaverLogin = () => {
        login({ email: "dongchyeon", password: "1234" }, {
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#9CDEF1] to-[#FFFFFF]">

            <Image src="/icons/ic-logo.svg" alt="서비스 로고" width={303} height={118} className="mb-[18px]" />

            {/* 메인 헤드라인 */}
            <h1 className="title-2 text-primary-900 text-center mb-[116px]">
                막막함에서 벗어나, 당장 시작부터 할 수 있어요
            </h1>

            {/* 네이버 로그인 버튼 */}
            <button
                className="flex items-center justify-center gap-[10px] px-4 py-3 rounded-lg bg-[#2DB400] text-common-100 body-3-700 shadow-md"
                onClick={handleNaverLogin}
            >
                <Image src="/icons/ic-naver.svg" alt="네이버 아이콘" width={16} height={16} />
                네이버 로그인으로 1초만에 시작
            </button>
        </div>
    );
}
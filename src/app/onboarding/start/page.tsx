'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OnboardingWelcomePage() {
    const router = useRouter();

    const handleNaverLogin = () => {
        const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
        const redirectUrl = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URL;

        if (!clientId || !redirectUrl) {
            console.error('Naver client ID or redirect URL is not defined.');
            return;
        }

        const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${Math.random().toString(36).substring(2, 15)}`;

        router.push(naverLoginUrl);
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
'use client';

export default function OnboardingWelcomePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* 프로필/서비스 아이콘 (placeholder) */}
            <div className="w-32 h-32 rounded-2xl bg-coolNeutral-300 flex items-center justify-center mb-10" />

            {/* 메인 헤드라인 */}
            <h1 className="text-[32px] font-bold text-common-0 text-center mb-2 leading-snug">
                막막함에서 벗어나, 당장 실행부터 할 수 있어요
            </h1>

            {/* 서브텍스트 */}
            <p className="text-[20px] text-coolNeutral-700 text-center mb-12">
                서비스 소개
            </p>

            {/* 네이버 로그인 버튼 */}
            <button
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#1EC800] text-white text-lg font-bold shadow-md hover:bg-[#19b200] transition mb-4"
                // onClick={handleNaverLogin}  // 실제 로그인 로직 연결
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <rect width="24" height="24" rx="6" fill="#fff"/>
                    <path
                        d="M6.8 7.19v9.62c0 .23.27.34.42.18l3.99-4.46 3.99 4.46c.15.16.42.05.42-.18V7.19c0-.11-.09-.19-.2-.19h-1.6a.2.2 0 0 0-.2.2v5.33l-2.49-2.82a.28.28 0 0 0-.42 0l-2.49 2.82V7.2c0-.11-.09-.2-.2-.2H7c-.11 0-.2.08-.2.19Z"
                        fill="#1EC800"
                    />
                </svg>
                네이버 로그인으로 1초만에 시작
            </button>
        </div>
    );
}
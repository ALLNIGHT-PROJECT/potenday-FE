'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingAutoTaskExtract_1Page() {
    const router = useRouter();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    
    // 텍스트가 일정 길이(10자 이상)일 때만 버튼 활성화
    const isButtonEnabled = text.length >= 2 && !isLoading

    const handleClick = () => {
        setIsLoading(true)

        // 추후 서버 요청으로 대체 가능
        setTimeout(() => {
            router.replace("/todo/autoTaskExtract_2")  // 여기서 결과 페이지나 다음 스텝으로 이동
        }, 3000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 relative">
            {/* ✅ 로딩 오버레이 */}
            {isLoading && (
                <div
                    className="absolute inset-0 bg-[rgba(250,250,250,0.5)] backdrop-blur-none z-50 flex flex-col items-center justify-center">
                    <div
                        className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-700 text-lg font-semibold">서비스명 추출 중...</p>
                </div>
            )}
            <div className="min-h-[300px] flex flex-col bg-white p-4 max-w-4xl w-full">

                {/* 상단 헤더: 왼쪽에 1/2과 제목, 오른쪽에 버튼 */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-col">
                        <div className="body-2-500 text-coolNeutral-600 mb-3">1/2</div>
                        <h1 className="headline-1 font-semibold">5초면 끝, 할 일을 추출할게요</h1>
                    </div>
                    <button
                        className={`px-5 py-2 rounded-md font-semibold transition ${
                        isButtonEnabled
                            ? "bg-primary-600 text-white hover:bg-primary-600"
                            : "bg-gray-100 text-gray-700 cursor-not-allowed"
                        }`}
                        disabled={!isButtonEnabled}
                        onClick={handleClick}
                    >
                        할 일 추출하기
                    </button>
                </div>

                {/* 텍스트 입력창: 회색 배경 */}
                <div className="flex-1 w-full">
                    <textarea
                        placeholder="텍스트 혹은 링크를 이곳에 첨부해주세요"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[500px] bg-gray-100 resize-none w-full border-0 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 px-5 py-4"
                    />
                </div>
            </div>
        </div>

    )
}
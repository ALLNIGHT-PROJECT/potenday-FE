'use client';

import { useState } from "react";

export default function OnboardingProfilePage() {
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');

    const canSubmit = name.trim().length > 0 && intro.trim().length > 0;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* 메인 헤드라인 */}
            <h1 className="headline-1 text-coolNeutral-700 text-center mb-[36px]">
                서비스명에 오신 것을 환영해요!
            </h1>
            <form className="flex flex-col gap-7 w-full max-w-[480px] mx-auto pt-2">
                {/* 사용자 이름 */}
                <div>
                    <label className="block label-1 text-coolNeutral-500 mb-2">
                        사용자 이름
                    </label>
                    <input
                        className="w-full bg-coolNeutral-200 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none"
                        maxLength={10}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="한 줄 소개를 입력해 주세요"
                    />
                    <div className="label-2 text-coolNeutral-500 mt-2">
                        *영문/한글 10자 이내로 사용할 수 있어요
                    </div>
                </div>

                {/* 한 줄 소개 */}
                <div>
                    <label className="block label-1 text-coolNeutral-500 mb-2">
                        한 줄 소개
                    </label>
                    <input
                        className="w-full bg-coolNeutral-200 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none"
                        maxLength={50}
                        value={intro}
                        onChange={e => setIntro(e.target.value)}
                        placeholder="이름 입력"
                    />
                    <div className="label-2 text-coolNeutral-500 mt-2">
                        *한글 50자 이내로 입력해 주세요
                    </div>
                </div>

                {/* 시작하기 버튼 */}
                <div className="flex justify-center mt-[84px]">
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`
                            w-fit px-4 py-2 rounded-[6px] body-3-700
                            transition
                            ${canSubmit
                            ? 'bg-primary-600 text-common-100'
                            : 'bg-coolNeutral-250 text-coolNeutral-700'
                        }
                        `}
                    >
                        시작하기
                    </button>
                </div>
            </form>
        </div>
    );
}
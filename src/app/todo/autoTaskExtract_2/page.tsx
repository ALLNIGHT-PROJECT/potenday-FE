'use client';

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import LinkInputTags from "@/shared/components/LinkInputTags";
import AppDateTimePicker from "@/shared/components/AppDateTimePicker";

export default function OnboardingAutoTaskExtract_1Page() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [importance, setImportance] = useState('중간');

    const canSubmit = name.trim().length > 0 && !!deadline && importance.trim().length > 0;

    const handleClick = () => {
        // 추후 서버 요청으로 대체 가능
        setTimeout(() => {
            router.push("/")  // 여기서 결과 페이지나 다음 스텝으로 이동
        }, 3000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 relative">

            <div className="min-h-[300px] flex flex-col bg-white p-4 max-w-4xl w-full">

                {/* 상단 헤더: 왼쪽에 2/2과 제목, 오른쪽에 버튼 */}
                <div className="flex flex-col mb-8">
                    <div className="body-2-500 text-coolNeutral-600 mb-3">2/2</div>
                    <div className="flex justify-between">
                        <h1 className="headline-1 font-semibold">할 일 정보를 수정 후 추가해보세요!</h1>

                        <button
                            type="button"
                            disabled={!canSubmit}
                            className={`
                                label-1 px-4 py-2 rounded-[6px]
                                transition
                                ${canSubmit
                                ? "bg-primary-600 text-common-100 hover:bg-primary-700"
                                : "bg-coolNeutral-250 text-coolNeutral-700 cursor-not-allowed"
                            }
                            `}
                            onClick={ canSubmit ? handleClick : undefined }
                        >
                            할 일로 추가할게요
                        </button>
                    </div>
                </div>

                <form className="flex flex-col">
                    {/* 할 일 이름 */}
                    <div>
                        <input
                            className="w-full bg-coolNeutral-200 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none mb-2"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="할 일 이름"
                        />
                    </div>

                    {/* 설명 */}
                    <div>
                        <textarea
                            rows={4}
                            className="w-full bg-coolNeutral-100 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none resize-none mb-10"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="(선택) 할 일에 대해 간단하게 설명해주세요 (0/200)"
                            maxLength={200}
                        />
                    </div>

                    {/* 기한 */}
                    <div className="mb-10">
                        <label className="label-1 text-coolNeutral-500 mb-2 block">*기한</label>
                        <AppDateTimePicker
                            value={deadline}
                            onChange={setDeadline}
                            minutesStep={5}
                        />
                    </div>

                    {/* 중요도 */}
                    <div className="mb-10">
                        <div className="label-1 text-coolNeutral-700 mb-1 block">*중요도</div>
                        <div className="flex flex-col gap-2">
                            {["낮음", "중간", "높음"].map(opt => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="importance"
                                        value={opt}
                                        checked={importance === opt}
                                        onChange={() => setImportance(opt)}
                                        className="color-primary-600"
                                    />
                                    <span className={
                                        `label-1-700 ${
                                            importance === opt ? 'text-coolNeutral-800' : 'text-coolNeutral-600'
                                        }`
                                    }>
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 참고자료 */}
                    <div>
                        <label className="label-1 text-coolNeutral-700 mb-1 block">참고 자료 (링크)</label>
                        <LinkInputTags />
                    </div>
                </form>
            </div>
        </div>

    )
}
'use client';

import Image from "next/image";
import React, { useState } from "react";
import LinkInputTags from "@/shared/components/LinkInputTags";
import AppDateTimePicker from "@/shared/components/AppDateTimePicker";

type AddTaskModalProps = {
    onCloseAction?: () => void;
    onSubmitAction?: () => void;
};

export default function AddTaskModal({ onCloseAction, onSubmitAction }: AddTaskModalProps) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [importance, setImportance] = useState('중간');

    const canSubmit = name.trim().length > 0 && !!deadline && importance.trim().length > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div
                className="bg-white rounded-2xl shadow-xl w-[80%] p-10 relative max-h-[80vh] overflow-y-auto"
            >
                {/* 제목 */}
                <div className="flex items-center mb-[36px]">
                    <h2 className="headline-1 text-coolNeutral-700">새로운 할 일</h2>

                    <div className="flex-1" />

                    <button
                        type="button"
                        disabled={!canSubmit}
                        className={`
                            label-1 px-4 py-2 rounded-[6px] mr-4
                            transition
                            ${canSubmit
                            ? "bg-primary-600 text-common-100 hover:bg-primary-700"
                            : "bg-coolNeutral-250 text-coolNeutral-700 cursor-not-allowed"
                        }
                        `}
                        onClick={canSubmit ? onSubmitAction : undefined}
                    >
                        등록하기
                    </button>

                    <button
                        type="button"
                        onClick={ onCloseAction }
                        className="
                            w-10 h-10
                            flex items-center justify-center
                            rounded-lg
                            border border-coolNeutral-250
                            bg-white
                            hover:bg-coolNeutral-100
                            transition
                          "
                    >
                        <Image src="/icons/ic-close.svg" alt="닫기" width={16} height={16} />
                    </button>
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
    );
}

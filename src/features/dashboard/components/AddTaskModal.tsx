'use client';

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import React, {useRef, useState} from "react";

type AddTaskModalProps = {
    onCloseAction?: () => void;
    onSubmitAction?: () => void;
};

export default function AddTaskModal({ onCloseAction, onSubmitAction }: AddTaskModalProps) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [deadline, setDeadline] = React.useState<Date | undefined>(new Date());
    const [importance, setImportance] = useState('중간');

    const canSubmit = name.trim().length > 0 && !!deadline && importance.trim().length > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div
                className="bg-white rounded-2xl shadow-xl w-[600px] p-10 relative"
            >
                {/* 제목 */}
                <div className="flex justify-between items-center mb-[36px]">
                    <h2 className="headline-1 text-coolNeutral-700">새로운 할 일</h2>
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
                        onClick={canSubmit ? onSubmitAction : undefined}
                    >
                        등록하기
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className={`
                                        w-full bg-coolNeutral-100 rounded-[6px] px-4 py-2 body-3-500
                                        text-coolNeutral-900 text-left focus:outline-none
                                        ${!deadline ? 'text-coolNeutral-400' : ''}
                                    `}
                                >
                                    {deadline ? format(deadline, "yyyy-MM-dd") : "작업 기한을 선택해주세요"}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={deadline}
                                    onSelect={setDeadline}
                                />
                            </PopoverContent>
                        </Popover>
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

function LinkInputTags() {
    const [links, setLinks] = useState<string[]>([]);
    const [currentLink, setCurrentLink] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // 엔터 입력 시 등록
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentLink.trim() !== "") {
            e.preventDefault();
            // 중복, 빈 문자열 방지
            if (!links.includes(currentLink.trim())) {
                setLinks([...links, currentLink.trim()]);
                setCurrentLink("");
            }
        }
    };

    // X 클릭 시 삭제
    const onRemoveLink = (idx: number) => {
        setLinks(links.filter((_, i) => i !== idx));
    };

    return (
        <div className="w-full">
            {/* 등록된 링크 리스트 */}
            {links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {links.map((link, idx) => (
                        <div
                            key={link}
                            className="relative bg-coolNeutral-200 rounded-xl px-4 py-2 flex items-center max-w-full shadow-sm"
                        >
                            <span className="break-all body-3-700 text-coolNeutral-900">{link}</span>
                            <button
                                onClick={() => onRemoveLink(idx)}
                                className="ml-2 absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-coolNeutral-300 transition"
                                aria-label="링크 삭제"
                                type="button"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" fill="#E4E4E7" />
                                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#6D6E71" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 입력창 */}
            <input
                ref={inputRef}
                className="w-full bg-coolNeutral-100 rounded-[6px] px-4 py-2 body-3-500 text-coolNeutral-700 focus:outline-none"
                value={currentLink}
                onChange={e => setCurrentLink(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="링크를 이곳에 붙여넣어주세요"
            />
        </div>
    );
}
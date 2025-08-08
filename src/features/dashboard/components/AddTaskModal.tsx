'use client';

import Image from "next/image";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from "date-fns/locale";
import { addMinutes } from 'date-fns';
import React, {useRef, useState} from "react";

type AddTaskModalProps = {
    onCloseAction?: () => void;
    onSubmitAction?: () => void;
};

function ceilToStep(date: Date, step: number) {
    const d = new Date(date);
    d.setSeconds(0, 0);
    const m = d.getMinutes();
    const next = Math.ceil(m / step) * step;
    if (next === m) return addMinutes(d, step);
    d.setMinutes(next);
    return d;
}

const minDt = ceilToStep(new Date(), 5);

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
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
                                <DateTimePicker
                                    value={deadline}
                                    onChange={setDeadline}
                                    ampm={false}
                                    minutesStep={5}
                                    minDateTime={minDt}
                                    format="yyyy-MM-dd HH:mm"
                                    sx={{
                                        /* 달력 오늘/선택 색 */
                                        '& .MuiPickersDay-root.Mui-selected': {
                                            backgroundColor: '#0BAFDC !important',
                                            color: '#fff',
                                        },
                                        '& .MuiPickersDay-root.MuiPickersDay-today': {
                                            borderColor: '#0BAFDC',
                                        },

                                        /* 👉 시간 선택 컬럼(시/분) 선택 색 */
                                        '& .MuiMultiSectionDigitalClockSection-item.Mui-selected': {
                                            backgroundColor: '#0BAFDC',
                                            color: '#fff',
                                        },
                                        '& .MuiMultiSectionDigitalClockSection-item.Mui-selected:hover': {
                                            backgroundColor: '#0BAFDC',
                                        },

                                        /* 액션 바 버튼 색 */
                                        '& .MuiDialogActions-root .MuiButton-root': {
                                            color: '#0BAFDC',
                                            fontWeight: 700,
                                        },
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            placeholder: '작업 기한을 선택해주세요',
                                            size: 'small',
                                            sx: {
                                                borderRadius: '6px',
                                                backgroundColor: '#F4F4F5',
                                                fontSize: '16px',
                                                '& input': { padding: '10px 16px' },
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            },
                                        },
                                        day: {
                                            sx: {
                                                '&.Mui-selected': {
                                                    backgroundColor: '#0BAFDC', // primary-600
                                                    color: '#fff',
                                                    '&:hover': {
                                                        backgroundColor: '#099dc7',
                                                    },
                                                },
                                                '&.MuiPickersDay-today': {
                                                    borderColor: '#0BAFDC',
                                                },
                                            },
                                        },
                                        actionBar: {
                                            actions: ['cancel', 'accept'],
                                            sx: {
                                                '& .MuiButton-root': {
                                                    color: '#0BAFDC',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(11, 175, 220, 0.1)',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
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
            setLinks([...links, currentLink.trim()]);
            setCurrentLink("");
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
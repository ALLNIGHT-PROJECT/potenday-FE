"use client";

import TodoCard from "@/features/dashboard/components/TodoCard";
import UpcomingTodoCard from "@/features/dashboard/components/UpcomingTodoCard";
import { redirect } from "next/navigation";
import {useEffect, useRef, useState} from "react";

export default function Home() {
    {/* redirect("/onboarding/welcome"); */}

    return (
        <div className="flex space-x-5">
            <div className="flex-1 flex-col pb-[30px] px-[30px] space-y-4 items-start">
                <TaskHeaderBar />
                <TodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    progress={75}
                    statusLabel="진행 중"
                    description="이 할 일에 대한 자세한 설명입니다."
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                    references={[
                        { name: "참조 문서 1", url: "https://example.com/doc1" },
                        { name: "참조 문서 2", url: "https://example.com/doc2" },
                    ]}
                />

                <TodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    progress={75}
                    statusLabel="진행 중"
                    description="이 할 일에 대한 자세한 설명입니다."
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                    references={[
                        { name: "참조 문서 1", url: "https://example.com/doc1" },
                        { name: "참조 문서 2", url: "https://example.com/doc2" },
                    ]}
                />

                <TodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    progress={75}
                    statusLabel="진행 중"
                    description="이 할 일에 대한 자세한 설명입니다."
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                    references={[
                        { name: "참조 문서 1", url: "https://example.com/doc1" },
                        { name: "참조 문서 2", url: "https://example.com/doc2" },
                    ]}
                />
            </div>

            <div className="flex-col space-y-4 items-start p-[30px] rounded-tl-2xl border border-gray-200">
                <div className="flex items-center">
                    {/* 좌측 타이틀 */}
                    <span className="body-1-700 text-coolNeutral-650">Task box</span>

                    <div className="flex-1" />

                    {/* 날짜 선택 박스 */}
                    <div className="flex items-center bg-coolNeutral-200 rounded-[6px] px-4 py-2 mr-2">
                        <img src="/icons/ic-calendar-coolNeutral-600.svg" alt="달력" className="w-4 h-4 mr-[10px]" />
                        <span className="label-1-700 text-coolNeutral-900">2025.08</span>
                    </div>

                    {/* 정렬 박스 */}
                    <div className="flex items-center bg-coolNeutral-200 rounded-[6px] px-4 py-2">
                        <img src="/icons/ic-sort.svg" alt="정렬" className="w-4 h-4 mr-[10px]" />
                        <span className="label-1-700 text-coolNeutral-900">최신 순</span>
                    </div>
                </div>

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h"  },
                    ]}
                />

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h" },
                    ]}
                />

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h" },
                    ]}
                />
            </div>
        </div>
    );
}

function TaskHeaderBar() {
    return (
        <div className="w-full flex items-center gap-4">
            <p className="headline-1 text-common-0">
                Tue, 5
            </p>

            {/* 중앙 여백 (양끝 정렬) */}
            <div className="flex-1" />

            <div
                className="
                  flex items-center justify-between
                  w-[420px] min-w-[320px] max-w-[420px]
                  bg-gradient-to-r from-[#77DDFB] to-[#BEE9F7]
                  rounded-[10px]
                  pl-3 pr-4 py-2
                  shadow
                "
            >
                {/* 아이콘 + 텍스트 */}
                <div className="flex items-center gap-[10px]">
                    {/* 아이콘(깃털) */}
                    <img src="icons/ic-pen.svg" alt="Pen" w-6 h-6/>
                    {/* 텍스트 (굵은 부분과 일반 부분) */}
                    <span className="label-1 text-white">
                        Liquid Glass에 대한 자료를 찾아드릴까요?
                    </span>
                </div>
                {/* AI 채팅 열기 */}
                <button className="flex items-center text-primary-900 label-1">
                    AI 채팅 열기
                    <img src="icons/ic-dropdown.svg" alt="Dropdown" className="w-4 h-4 ml-1" />
                </button>
            </div>

            <AddTaskDropdown />
        </div>
    );
}

function AddTaskDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 바깥 클릭 시 닫힘
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div className="relative flex flex-col items-start w-fit">
            {/* Task 추가하기 버튼 */}
            <button
                type="button"
                className="
                    flex items-center gap-2
                    bg-common-100
                    rounded-[12px]
                    border border-coolNeutral-100
                    px-5 py-3
                    label-1
                    text-coolNeutral-800
                    shadow
                "
                onClick={() => setOpen(v => !v)}
            >
                <img src="./icons/ic-plus.svg" alt="할 일 추가" className="w-6 h-6" />
                Task 추가하기
            </button>

            {/* 드롭다운 */}
            {open && (
                <div
                    ref={dropdownRef}
                    className="
                        absolute left-0 mt-[60px] min-w-[265px] bg-white
                        rounded-[6px] shadow-lg z-10 animate-fade-in
                        flex flex-col p-1
                    "
                >
                    {/* 간편 추출하기 */}
                    <button
                        type="button"
                        className="group flex items-center w-full pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        간편 추출하기
                        <img
                            src="/icons/ic-arrow-right.svg"
                            alt="화살표"
                            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                    {/* 직접 입력하기 */}
                    <button
                        type="button"
                        className="group flex items-center w-full pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        직접 입력하기
                        <img
                            src="/icons/ic-arrow-right.svg"
                            alt="화살표"
                            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                </div>
            )}

            {/* 드롭다운 애니메이션 */}
            <style>{`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(-6px);}
                  to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in { animation: fade-in 0.15s ease; }
            `}</style>
        </div>
    );
}

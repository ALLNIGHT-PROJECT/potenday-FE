"use client";

import TodoCard from "@/features/dashboard/components/TodoCard";
import UpcomingTodoCard from "@/features/dashboard/components/UpcomingTodoCard";
import CommonDropdown from "@/components/ui/dropdown/CommonDropdown";
import {usePathname, useRouter} from 'next/navigation';
import {useState} from "react";
import AddTaskModal from "@/features/dashboard/components/AddTaskModal";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/dropdown/NotificationDropdown";
import AccountDropdown from "@/components/ui/dropdown/AccountDropdown";

export default function Home() {
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
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();

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

            {/* Task 추가하기 드롭다운 */}
            <CommonDropdown
                align="right"
                offsetY={8}
                renderButton={({ onClick }) => (
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-common-100 rounded-[12px] border border-coolNeutral-100 px-5 py-3 label-1 text-coolNeutral-800 shadow"
                        onClick={onClick}
                    >
                        <img src="./icons/ic-plus.svg" alt="할 일 추가" className="w-6 h-6"/>
                        Task 추가하기
                    </button>
                )}
            >
                <div className="min-w-[180px] flex flex-col p-[8px]">
                    <button
                        type="button"
                        className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                        onClick={() => {
                            router.push('/todo/autoTaskExtract_1');
                        }}
                    >
                        간편 추출하기
                        <img
                            src="/icons/ic-arrow-right.svg"
                            alt=">"
                            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                    <button
                        type="button"
                        className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        직접 입력하기
                        <img
                            src="/icons/ic-arrow-right.svg"
                            alt=">"
                            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                </div>
            </CommonDropdown>

            {/* AddTaskModal 모달 */}
            {showModal && (
                <AddTaskModal onCloseAction={() => setShowModal(false)} />
            )}
        </div>
    );
}

function Header() {
    const pathname = usePathname();
    const isOnboarding = pathname.startsWith("/onboarding");

    if (isOnboarding) return null;

    return (
        <header className="flex items-center w-full px-8 py-4 bg-white">
            {/* 좌측: 워크스페이스/날짜 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* 워크스페이스명 + 아이콘 */}
                <div className="flex items-center gap-2">
                    {/* 칸반 아이콘(예시) */}
                    <Image src="/icons/ic-side-bar.svg" alt="" width={16} height={16} />
                    <span className="label-1 text-coolNeutral-900 truncate">{'{User}’s Workspace'}</span>
                </div>
            </div>

            {/* 우측: 알림, 프로필, 로그아웃 */}
            <div className="flex items-center gap-2 ml-6">
                <NotificationDropdown/>
                <AccountDropdown />
            </div>
        </header>
    );
}
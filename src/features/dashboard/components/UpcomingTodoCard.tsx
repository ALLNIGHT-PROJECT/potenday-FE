'use client';

import { cn } from '@/lib/utils';
import CommonDropdown from "@/components/ui/dropdown/CommonDropdown";
import {UpcomingTodoDetailProps, UpcomingTodoHeaderProps, UpcomingTodoMetaInfoProps, UpcomingTodoTask} from "../type"

export default function UpcomingTodoCard({
     project,
     title,
     importance,
     estimatedTime,
     deadline,
     tasks
}: UpcomingTodoDetailProps) {
    return (
        <div
            className={`bg-white rounded-[16px] shadow-md p-4 flex flex-col flex-none w-auto min-w-[360px]`}
        >
            <UpcomingTodoHeader project={project} title={title}/>
            <div className="mt-4">
                <UpcomingTodoMetaInfo importance={importance} estimatedTime={estimatedTime} deadline={deadline}/>
            </div>
            <div className="mt-6">
                <UpcomingTodoTaskList tasks={tasks}/>
            </div>
            <AddTodayTaskButton/>
        </div>
    );
}

function UpcomingTodoHeader({
    project,
    title
}: UpcomingTodoHeaderProps) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                {/* 제목 */}
                <span className="body-2-700 ml-1 flex-1 min-w-0 whitespace-nowrap">
                    {title}
                </span>
            </div>
            <div className="flex flex-col min-w-[230px] max-w-xs pt-2">
                {/* ic-more를 우측 상단에 완전히 붙이기 위한 flex 컨테이너 */}
                <div className="flex justify-end items-start w-full">
                    <CommonDropdown
                        align="right"
                        offsetY={0}
                        dropdownClassName="min-w-[100px]"
                        renderButton={({ onClick }) => (
                            <button type="button" onClick={onClick} className="p-0 m-0">
                                <img
                                    src="/icons/ic-more.svg"
                                    alt="더보기"
                                    className="w-4 h-4 cursor-pointer"
                                />
                            </button>
                        )}
                    >
                        <div className="min-w-[180px] flex flex-col p-[8px]">
                            <button
                                type="button"
                                className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                                onClick={() => {
                                    console.log("수정하기")
                                }}
                            >
                                수정하기
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
                                    console.log("삭제하기")
                                }}
                            >
                                삭제하기
                                <img
                                    src="/icons/ic-arrow-right.svg"
                                    alt=">"
                                    className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </button>
                        </div>
                    </CommonDropdown>
                </div>
            </div>
        </div>
    );
}

function UpcomingTodoMetaInfo({ importance, estimatedTime, deadline }: UpcomingTodoMetaInfoProps) {
    // 색상 매핑
    const importanceColor =
        importance === '높음' ? 'text-[#FF5E47]' : importance === '보통' ? 'text-[#FDBA23]' : 'text-[#9CA3AF]';

    return (
        <div className="ml-6 space-y-3">
            {/* 중요도 */}
            <div className="flex items-center label-1 text-coolNeutral-500">
                <img src="/icons/ic-star.svg" alt="중요도" className="w-4 h-4" />
                <span className="ml-1">중요도</span>
                <span className={`ml-2 ${importanceColor}`}>{importance}</span>
            </div>
            {/* 예상 소요시간 */}
            <div className="flex items-center label-1 text-coolNeutral-500">
                <img src="/icons/ic-clock.svg" alt="소요시간" className="w-4 h-4" />
                <span className="ml-1">예상 소요시간</span>
                <span className="ml-2 text-coolNeutral-750">{estimatedTime}</span>
            </div>
            {/* 기한 */}
            <div className="flex items-center label-1 text-coolNeutral-500">
                <img src="/icons/ic-calendar.svg" alt="기한" className="w-4 h-4" />
                <span className="ml-1">기한</span>
                <span className="ml-2 text-coolNeutral-750">{deadline}</span>
            </div>
        </div>
    );
}

function UpcomingTodoTaskList({ tasks }: { tasks: UpcomingTodoTask[] }) {
    return (
        <div className="space-y-2">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={cn(
                        'flex items-center justify-between p-2 bg-coolNeutral-100 rounded-lg border-semantic-border-divider',
                    )}
                >
                    <div className="flex items-center gap-2 ">
                        <span className="label-1 text-coolNeutral-600">
                            {task.name}
                        </span>
                    </div>
                    <span className="label-1 text-coolNeutral-600">
                        {task.estimatedTime}
                    </span>
                </div>
            ))}
        </div>
    )
}

function AddTodayTaskButton() {
    return (
        <button
            type="button"
            onClick={() => alert("오늘 할 일이 추가되었습니다!")}
            className="
                flex items-center gap-2
                px-2 py-1
                rounded-[6px]
                border border-semantic-border-divider
                bg-common-100
                hover:bg-gray-200
                active:bg-gray-300
                transition-colors duration-150
                mt-5
                self-end
            ">
            <span className="caption-2 text-coolNeutral-750">
                오늘 할 일에 추가하기
            </span>
        </button>
    );
}
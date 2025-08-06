'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type UpcomingTodoTask = {
    id: number;
    name: string;
    estimatedTime: string;
};

type UpcomingTodoDetailProps = {
    project: string;
    title: string;
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
    tasks: UpcomingTodoTask[];
};

type UpcomingTodoHeaderProps = {
    project: string;
    title: string;
};

type UpcomingTodoMetaInfoProps = {
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
};

export default function UpcomingTodoCard({
     project,
     title,
     importance,
     estimatedTime,
     deadline,
     tasks,
}: UpcomingTodoDetailProps) {
    return (
        <div className="bg-white rounded-[16px] shadow-md p-4 flex-none w-auto min-w-[360px]">
            <UpcomingTodoHeader project={project} title={title} />
            <div className="mt-4">
                <UpcomingTodoMetaInfo importance={importance} estimatedTime={estimatedTime} deadline={deadline} />
            </div>
            <div className="mt-6">
                <UpcomingTodoTaskList tasks={tasks} />
            </div>
        </div>
    );
}

function UpcomingTodoHeader({
    project,
    title,
}: UpcomingTodoHeaderProps) {
    return (
        <div className="flex items-center justify-between w-full">
            {/* 왼쪽: 드래그 핸들 + 배지 + 제목 */}
            <div className="flex items-center gap-3">
                <img src="/icons/ic-drag-handle.svg" alt="드래그" />
                {/* 프로젝트 배지 */}
                <span className="bg-blue-700 text-caption-2 text-common-100 font-semibold px-2 py-1 rounded-[6px]">
                    {project}
                </span>
                {/* 제목 */}
                <span className="text-body-2-700 ml-1">
                    {title}
                </span>
            </div>
            {/* ic-more를 우측 상단에 */}
            <img
                src="/icons/ic-more.svg"
                alt="더보기"
                className="self-end w-4 h-4 mb-2 cursor-pointer"
            />
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
            <div className="flex items-center text-label-1 text-coolNeutral-500">
                <img src="/icons/ic-star.svg" alt="중요도" className="w-4 h-4" />
                <span className="ml-1">중요도</span>
                <span className={`ml-2 ${importanceColor}`}>{importance}</span>
            </div>
            {/* 예상 소요시간 */}
            <div className="flex items-center text-label-1 text-coolNeutral-500">
                <img src="/icons/ic-clock.svg" alt="소요시간" className="w-4 h-4" />
                <span className="ml-1">예상 소요시간</span>
                <span className="ml-2 text-coolNeutral-750">{estimatedTime}</span>
            </div>
            {/* 기한 */}
            <div className="flex items-center text-label-1 text-coolNeutral-500">
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
                        <span className="text-label-1 text-coolNeutral-600">
                            {task.name}
                        </span>
                    </div>
                    <span className="text-label-1 text-coolNeutral-600">
                        {task.estimatedTime}
                    </span>
                </div>
            ))}
        </div>
    )
}
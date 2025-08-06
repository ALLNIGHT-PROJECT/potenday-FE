'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Task = {
    id: number;
    name: string;
    estimatedTime: string;
    completed: boolean;
};

type Reference = {
    name: string;
    url?: string;
};

type TodoDetailProps = {
    project: string;
    title: string;
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
    progress: number; // 0~100
    statusLabel: string;
    description: string;
    tasks: Task[];
    references: Reference[];
};

type TodoHeaderProps = {
    project: string;
    title: string;
    progress: number; // 0~100
};

type TodoMetaInfoProps = {
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
};

export default function TodoCard({
   project,
   title,
   importance,
   estimatedTime,
   deadline,
   progress,
   statusLabel,
   description,
   tasks,
   references,
}: TodoDetailProps) {
    return (
        <div className="flex bg-blue-100 rounded-[20px] p-3 gap-3 w-auto">
            {/* 왼쪽: 하얀 카드 (메인) */}
            <div className="flex-1 bg-white rounded-[16px] shadow-md p-4">
                <TodoHeader project={project} title={title} progress={progress} />
                <div className="mt-4">
                    <TodoMetaInfo importance={importance} estimatedTime={estimatedTime} deadline={deadline} />
                </div>
                <div className="mt-6">
                    <TodoTaskList tasks={tasks} />
                </div>
            </div>
            {/* 오른쪽: 설명 및 링크칩 */}
            <div className="flex flex-col min-w-[230px] max-w-xs pt-2">
                {/* ic-more를 우측 상단에 */}
                <img
                    src="/icons/ic-more.svg"
                    alt="더보기"
                    className="self-end w-4 h-4 mb-2 cursor-pointer"
                />
                <div className="text-caption-1 font-semibold text-coolNeutral-600 mb-6 whitespace-pre-line">
                    {description}
                </div>
                <div className="flex flex-col gap-1">
                    {references.map((ref, i) => (
                        <a
                            key={i}
                            href={ref.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white border border-gray-200 text-caption-2 text-coolNeutral-500 rounded-[6px] px-2 py-1 shadow-sm hover:bg-gray-50 transition"
                        >
                            {ref.name}
                        </a>
                    ))}
                    <span className="text-caption-1 text-coolNeutral-650 font-semibold cursor-pointer mt-1">+3 Files</span>
                </div>
            </div>
        </div>
    );
}

function TodoHeader({
    project,
    title,
    progress,
}: TodoHeaderProps) {
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
            {/* 오른쪽: 진행률 */}
            <div className="flex items-center bg-blue-100/60 px-2 py-1 rounded-lg min-w-[160px]">
                {/* 진행 바 */}
                <div className="w-[80px] mr-2">
                    <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div
                            className="h-2 bg-blue-700 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <span className="text-blue-700 text-caption-2 ml-2">{progress}% 진행 중</span>
            </div>
        </div>
    );
}

function TodoMetaInfo({ importance, estimatedTime, deadline }: TodoMetaInfoProps) {
    // 색상 매핑
    const importanceColor =
        importance === '높음' ? 'text-[#FF5E47]' : importance === '보통' ? 'text-[#FDBA23]' : 'text-[#9CA3AF]';

    return (
        <div className="ml-6 space-y-3">
            {/* 중요도 */}
            <div className="flex items-center text-label-1 text-coolNeutral-500">
                {/* 아이콘 */}
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

function TodoTaskList({ tasks }: { tasks: Task[] }) {
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
                        <Checkbox checked={task.completed} />
                        <span
                            className={cn(
                                'text-label-1',
                                task.completed && 'line-through text-coolNeutral-600'
                            )}
                        >
              {task.name}
            </span>
                    </div>
                    <span
                        className={cn(
                            'text-label-1',
                            task.completed ? 'text-coolNeutral-600' : 'text-gray-600'
                        )}
                    >
            {task.estimatedTime}
          </span>
                </div>
            ))}
        </div>
    )
}
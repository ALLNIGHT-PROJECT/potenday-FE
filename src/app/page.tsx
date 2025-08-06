"use client";

import TodoCard from "@/features/dashboard/components/TodoCard";
import UpcomingTodoCard from "@/features/dashboard/components/UpcomingTodoCard";

export default function Home() {
    return (
        <div className="flex space-x-5">
            <div className="flex-1 flex-col p-[30px] space-y-4 items-start">
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
                <p className="text-[24px] font-bold text-black">
                    동현&apos;s To Do List
                </p>

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                />

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                />

                <UpcomingTodoCard
                    project="프로젝트 A"
                    title="할 일 제목"
                    importance="높음"
                    estimatedTime="2시간"
                    deadline="2023-12-31"
                    tasks={[
                        { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
                        { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
                        { id: 2, name: "하위 작업 3", estimatedTime: "2h", completed: false },
                    ]}
                />
            </div>
        </div>
    );
}
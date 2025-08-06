"use client";

import TodoCard from "@/features/dashboard/components/TodoCard";

export default function Home() {
    return (
        <div className="w-full flex flex-col gap-4 items-start p-[30px]">
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
    );
}
'use client';

import { useRouter } from "next/navigation";

export default function OnboardingTaskSelectPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            {/* 헤드라인 */}
            <h2 className="headline-1 text-coolNeutral-700 text-center mb-[48px]">
                {'{서비스명}을 시작하기 전, 나의 할 일을 연동해보세요'}
            </h2>
            {/* 카드 2개 가로 배치 */}
            <div className="flex gap-[56px] justify-center">
                {/* 카드: 간편 추출하기 */}
                <TaskSelectCard
                    title="간편 추출하기"
                    desc={`텍스트, 문서 링크만 첨부하면
                    자동으로 할 일을 추출해요`}
                    icon={<div className="w-[142px] h-[142px] bg-[#9D9D9D] mb-[42px]" />}
                    onClick={() => router.push('/onboarding/extract')}   // 원하는 경로로
                />
                {/* 카드: 직접 입력하기 */}
                <TaskSelectCard
                    title="직접 입력하기"
                    desc="항목에 따라 할 일을 직접 작성해요"
                    icon={<div className="w-[142px] h-[142px] bg-[#9D9D9D] mb-[42px]" />}
                    onClick={() => router.push('/onboarding/manual')}    // 원하는 경로로
                />
            </div>
        </div>
    );
}

function TaskSelectCard({
    title,
    desc,
    icon,
    onClick,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex flex-col items-center justify-center
                w-[334px] h-[399px] bg-coolNeutral-100 rounded-2xl
            "
        >
            {icon}
            <div className="headline-2 text-common-0 mb-3">{title}</div>
            <div className="body-3-500 text-coolNeutral-600 text-center whitespace-pre-line">{desc}</div>
        </button>
    );
}
'use client';

import Image from "next/image";

export default function Header() {
    return (
        <header className="flex items-center w-full px-8 py-3 bg-white">
            {/* 좌측: 워크스페이스/날짜 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* 워크스페이스명 + 아이콘 */}
                <div className="flex items-center gap-2">
                    {/* 칸반 아이콘(예시) */}
                    <Image src="/icons/ic-side-bar.svg" alt="" width={16} height={16} />
                    <span className="text-label-1 text-coolNeutral-900 truncate">Yeji&apos;s Workspace</span>
                </div>
            </div>

            {/* 중앙: 블루 배너 */}
            <div className="flex justify-center">
                <div className="flex items-center rounded-[10px] bg-gradient-to-r from-[#70d9ff] to-[#d7eefe] px-4 h-11 min-w-[480px] max-w-[540px]">
                    <span className="text-white font-bold mr-2 text-[15px]">로고</span>
                    <span className="text-[15px] text-white font-medium">
            Liquid Glass에 대한 자료를 찾아드릴까요?
          </span>
                </div>
            </div>

            {/* 우측: 알림, 프로필, 로그아웃 */}
            <div className="flex items-center gap-2 ml-6">
                <button className="p-2 flex items-center justify-center bg-white rounded-md border border-gray-200 hover:bg-gray-100 transition">
                    <Image src="/icons/ic-notification.svg" alt="알림" width={22} height={22} />
                </button>
                <button className="flex items-center bg-coolNeutral-200 px-3 py-2 rounded-md border border-gray-200 text-gray-800 shadow text-[15px] font-semibold gap-[10px] hover:bg-gray-50 transition">
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                    로그아웃
                </button>
            </div>
        </header>
    );
}
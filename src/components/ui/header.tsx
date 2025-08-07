'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
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
                    <span className="label-1 text-coolNeutral-900 truncate">Yeji&apos;s Workspace</span>
                </div>
            </div>

            {/* 우측: 알림, 프로필, 로그아웃 */}
            <div className="flex items-center gap-2 ml-6">
                <button className="p-2 flex items-center justify-center bg-white rounded-md border border-gray-200 hover:bg-gray-100 transition">
                    <Image src="/icons/ic-notification.svg" alt="알림" width={22} height={22} />
                </button>
                <button className="flex items-center bg-coolNeutral-200 px-3 py-2 rounded-md border border-gray-200 text-gray-900 label-1-700 gap-[10px] hover:bg-gray-50 transition">
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                    로그아웃
                </button>
            </div>
        </header>
    );
}
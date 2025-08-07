'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/components/ui/dropdown/NotificationDropdown";
import AccountDropdown from "@/components/ui/dropdown/AccountDropdown";

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
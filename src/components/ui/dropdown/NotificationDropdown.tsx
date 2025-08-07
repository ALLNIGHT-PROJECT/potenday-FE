import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

interface Notification {
    id: number;
    message: string;
    date: string;
}

const notifications: Notification[] = [
    { id: 1, message: "업무가 추가되었습니다.", date: "2025-08-06" },
    { id: 2, message: "오늘의 할일을 한번 확인해보세요!", date: "2025-08-07" }
];

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 바깥 클릭 시 닫힘 처리
    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="p-2 flex items-center justify-center bg-white rounded-md border border-gray-200 hover:bg-gray-100 transition"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="알림"
            >
                <Image src="/icons/ic-notification.svg" alt="알림" width={22} height={22} />
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in">
                    <div className="p-4 border-b font-semibold text-gray-900">알림</div>
                    <ul className="max-h-72 overflow-y-auto divide-y">
                        {notifications.length === 0 ? (
                            <li className="p-4 text-center text-gray-400">알림이 없습니다.</li>
                        ) : (
                            notifications.map((noti) => (
                                <li key={noti.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="text-sm text-gray-900">{noti.message}</div>
                                    <div className="text-xs text-gray-400 mt-1">{noti.date}</div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

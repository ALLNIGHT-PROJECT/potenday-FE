import React, { useState, useRef, useEffect } from "react";

export default function AccountDropdown() {
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

  // 예시 데이터
  const email = "user@example.com";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center bg-coolNeutral-200 px-3 py-2 rounded-md border border-gray-200 text-gray-900 label-1-700 gap-[10px] hover:bg-gray-50 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="w-5 h-5 rounded-full bg-gray-200" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-in p-2 flex flex-col gap-2">
          <button
            className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-50 transition"
            onClick={() => alert("계정 관리로 이동")}
            type="button"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-gray-900 text-sm">홍길동</span>
              <span className="text-xs text-gray-900 text-left">{email}</span>
            </div>
          </button>
          <button
            type="button"
            className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
            onClick={() => alert("로그아웃")}
          >
            로그아웃
            <img
              src="/icons/ic-arrow-right.svg"
              alt=">"
              className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      )}
    </div>
  );
} 
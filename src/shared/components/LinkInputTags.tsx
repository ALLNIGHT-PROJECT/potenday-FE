import React, {useRef, useState} from "react";

export default function LinkInputTags() {
    const [links, setLinks] = useState<string[]>([]);
    const [currentLink, setCurrentLink] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // 엔터 입력 시 등록
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && currentLink.trim() !== "") {
            e.preventDefault();
            setLinks([...links, currentLink.trim()]);
            setCurrentLink("");
        }
    };

    // X 클릭 시 삭제
    const onRemoveLink = (idx: number) => {
        setLinks(links.filter((_, i) => i !== idx));
    };

    return (
        <div className="w-full">
            {/* 등록된 링크 리스트 */}
            {links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                    {links.map((link, idx) => (
                        <div
                            key={link}
                            className="relative bg-coolNeutral-200 rounded-xl px-4 py-2 flex items-center max-w-full shadow-sm"
                        >
                            <span className="break-all body-3-700 text-coolNeutral-900">{link}</span>
                            <button
                                onClick={() => onRemoveLink(idx)}
                                className="ml-2 absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-coolNeutral-300 transition"
                                aria-label="링크 삭제"
                                type="button"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" fill="#E4E4E7" />
                                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#6D6E71" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 입력창 */}
            <input
                ref={inputRef}
                className="w-full bg-coolNeutral-100 rounded-[6px] px-4 py-2 body-3-500 text-coolNeutral-700 focus:outline-none"
                value={currentLink}
                onChange={e => setCurrentLink(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="링크를 이곳에 붙여넣어주세요"
            />
        </div>
    );
}
import React, { useEffect, useMemo, useRef, useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

// Types
type ChatTab = {
    id: string;
    label: string;
    active?: boolean;
};

type ChatItem = {
    id: string;
    title: string;
    unread?: number;
};

// The Side Modal itself
export default function ChatSideModal({
      open,
      onClose,
      tabs,
      chats,
}: {
    open: boolean;
    onClose: () => void;
    tabs: ChatTab[];
    chats: ChatItem[];
}) {
    // Accessibility: close on ESC
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Focus first focusable in panel on open
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (open) {
            const first = panelRef.current?.querySelector<HTMLElement>(
                "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
            );
            first?.focus();
        }
    }, [open]);

    // Prevent body scroll when open
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden={!open}
                onClick={handleBackdropClick}
                className={cx(
                    "fixed inset-0 z-40 bg-black/35 backdrop-blur-[1px] transition-opacity duration-300",
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                )}
            />

            {/* Panel */}
            <aside
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={cx(
                    "fixed right-0 top-0 z-50 h-dvh w-full max-w-[900px] shadow-2xl border-l border-slate-200 bg-white",
                    "transition-transform duration-300 will-change-transform",
                    open ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header: New chat + Tabs */}
                <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
                    <div className="flex items-center gap-2 px-4 py-3">
                        <button
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 active:scale-[.98]"
                            onClick={() => alert("새로운 채팅 만들기")}
                        >
                            새로운 채팅 +
                        </button>
                        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
                            {tabs.map((t) => (
                                <TabPill key={t.id} label={t.label} active={!!t.active} />
                            ))}
                        </div>
                        <button
                            className="ml-2 rounded-full p-2 hover:bg-slate-100"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Body: chat list (left) + content (right) */}
                <div className="grid h-[calc(100dvh-56px)] grid-cols-12">
                    {/* Chat content */}
                    <div className="col-span-12 flex flex-col">
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Example bubbles */}
                            <Message role="user">프로젝트 일정 정리해줘</Message>
                            <Message role="assistant">다음 마일스톤부터 정리할게요. 우선 금요일 킥오프 미팅…</Message>
                            <Message role="user">OK, PPT 템플릿도 만들어줘</Message>
                        </div>

                        {/* Footer input */}
                        <footer className="border-t border-slate-200 p-4">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.currentTarget);
                                    alert("전송: " + (fd.get("msg") as string));
                                    e.currentTarget.reset();
                                }}
                                className="relative flex items-end"
                            >
                                <textarea
                                    name="msg"
                                    rows={5}
                                    placeholder="AI에게 무엇이든 물어보세요!"
                                    onKeyDownCapture={(e) => {
                                        if ((e.nativeEvent as any).isComposing || e.repeat) return;
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
                                        }
                                    }}
                                    className="min-h-[120px] max-h-[200px] w-full resize-none overflow-y-auto rounded-2xl border border-slate-300/80 bg-white px-4 py-2 pr-12 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
                                />
                                <button
                                    type="submit"
                                    className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 active:scale-[.98]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" className="h-4 w-4 text-blue-700">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M5 12l14-7-7 14-2-5-5-2z"/>
                                    </svg>
                                </button>
                            </form>
                        </footer>
                    </div>
                </div>
            </aside>
        </>
    );
}

function TabPill({label, active}: { label: string; active?: boolean }) {
    return (
        <div
            className={cx(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
                active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            )}
        >
            <span className="truncate max-w-[180px]">{label}</span>
            <button
                className={cx(
                    "grid h-5 w-5 place-items-center rounded-full",
                    active ? "hover:bg-white/10" : "hover:bg-black/10"
                )}
                onClick={() => alert("탭 닫기")}
                aria-label="탭 닫기"
            >
                ×
            </button>
        </div>
    );
}

function SearchInput({placeholder}: { placeholder?: string }) {
    return (
        <div className="relative">
            <input
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
                placeholder={placeholder}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            </svg>
        </div>
    );
}

function Message({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
    const isUser = role === "user";
    return (
        <div className={cx("mb-3 flex", isUser ? "justify-end" : "justify-start")}>
            <div
                className={cx(
                    "max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                    isUser ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"
                )}
            >
                {children}
            </div>
        </div>
    );
}

'use client';

import { useEffect, useRef } from 'react';

export type CommonModalProps = {
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onClose: () => void;
    onConfirm?: () => void;
    closeOnOverlayClick?: boolean; // default true
    children?: React.ReactNode;
};

export default function CommonModal({
    open,
    title,
    description,
    confirmText = '확인',
    cancelText = '취소',
    onClose,
    onConfirm,
    closeOnOverlayClick = true,
    children,
}: CommonModalProps) {
    const initialFocusRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden'; // 스크롤 잠금
        const t = setTimeout(() => initialFocusRef.current?.focus(), 0);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
            clearTimeout(t);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[1000]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cm-title"
            aria-describedby={description ? 'cm-desc' : undefined}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                onClick={closeOnOverlayClick ? onClose : undefined}
            />

            {/* Panel */}
            <div className="absolute inset-0 grid place-items-center p-4">
                <div
                    className="
                        w-full max-w-md rounded-2xl bg-white shadow-xl
                        animate-[cm-fadein_140ms_ease-out]
                    "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="px-6 pt-6">
                        <h2 id="cm-title" className="text-[18px] font-extrabold text-gray-900">
                            {title}
                        </h2>
                        {description && (
                            <p id="cm-desc" className="mt-2 text-[14px] text-gray-600">
                                {description}
                            </p>
                        )}
                        {children && <div className="mt-3">{children}</div>}
                    </div>

                    <div className="px-6 pb-6 pt-5 flex justify-end gap-3">
                        <button
                            ref={initialFocusRef}
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm?.();
                                onClose();
                            }}
                            className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold transition-colors"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes cm-fadein {
          from { opacity: 0; transform: translateY(6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
        </div>
    );
}

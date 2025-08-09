'use client';

import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import LinkInputTags from "@/shared/components/LinkInputTags";
import AppDateTimePicker from "@/shared/components/AppDateTimePicker";
import { EditTaskValue, ActionItem, Importance } from '../type';

type EditTaskModalProps = {
    open: boolean;
    value: EditTaskValue;
    onChange: (next: EditTaskValue) => void;

    onClose: () => void;
    onSubmit: () => void;

    // 선택: 제출가능 로직을 외부에서 커스텀하고 싶으면 override
    canSubmitOverride?: (v: EditTaskValue) => boolean;
};

export default function EditTaskModal({
    open,
    value,
    onChange,
    onClose,
    onSubmit,
    canSubmitOverride,
}: EditTaskModalProps) {
    const { name, desc, deadline, importance, actionItems, links } = value;


    // (1) 유효성 헬퍼 추가
    const isActionItemValid = (ai: ActionItem) => {
        const titleOk = ai.title.trim().length > 0;
        const minutesTotal = (ai.hours ?? 0) * 60 + (ai.minutes ?? 0);
        const timeOk = minutesTotal > 0; // 시간이 0이면 X
        return titleOk && timeOk;
    };

    // (2) canSubmit 계산에 반영
    const baseOk =
        name.trim().length > 0 &&
        !!deadline &&
        importance.trim().length > 0;

    const actionsOk = actionItems.every(isActionItemValid);

    const canSubmit =
        typeof canSubmitOverride === 'function'
            ? canSubmitOverride(value)
            : baseOk && actionsOk


    // ESC 닫기 + 스크롤 잠금 + (선택) 스크롤바 보정
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = document.body.style.overflow;
        const prevPaddingRight = document.body.style.paddingRight;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        const alreadyInside =
            document.activeElement &&
            document.querySelector('.your-modal-root')?.contains(document.activeElement);

        if (!alreadyInside) {
            const el = document.querySelector('[data-modal-autofocus]') as HTMLElement | null;
            if (el) setTimeout(() => el.focus(), 0);
        }

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
            document.body.style.paddingRight = prevPaddingRight;
        };
    }, [open, onClose]);

    if (!open) return null;

    // ---------- helper updaters (모두 부모에 반영) ----------
    const update = (patch: Partial<EditTaskValue>) => onChange({ ...value, ...patch });

    const setName = (v: string) => update({ name: v });
    const setDesc = (v: string) => update({ desc: v });
    const setDeadline = (d: Date | null) => update({ deadline: d });
    const setImportance = (imp: Importance) => update({ importance: imp });

    const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, Number.isFinite(v) ? v : min));

    const addActionItem = () => {
        const next: ActionItem = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            title: '',
            hours: 0,
            minutes: 0,
        };
        update({ actionItems: [...actionItems, next] });
    };


    const removeActionItem = (id: string) => {
        update({ actionItems: actionItems.filter((i) => i.id !== id) });
    };

    const updateItem = (id: string, patch: Partial<ActionItem>) => {
        update({
            actionItems: actionItems.map((i) => (i.id === id ? { ...i, ...patch } : i)),
        });
    };

    const setLinks = (next: string[]) => update({ links: next });

    // -------------------------------------------------------

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="bg-white rounded-2xl shadow-xl w-[80%] p-10 relative max-h-[80vh] overflow-y-auto">
                {/* 제목 */}
                <div className="flex items-center mb-[36px]">
                    <h2 className="headline-1 text-coolNeutral-700">새로운 할 일</h2>
                    <div className="flex-1" />
                    <button
                        type="button"
                        disabled={!canSubmit}
                        className={`label-1 px-4 py-2 rounded-[6px] mr-4 transition ${
                            canSubmit
                                ? 'bg-primary-600 text-common-100 hover:bg-primary-700'
                                : 'bg-coolNeutral-250 text-coolNeutral-700 cursor-not-allowed'
                        }`}
                        onClick={canSubmit ? onSubmit : undefined}
                    >
                        수정 마치기
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-coolNeutral-250 bg-white hover:bg-coolNeutral-100 transition"
                    >
                        <Image src="/icons/ic-close.svg" alt="닫기" width={16} height={16} />
                    </button>
                </div>

                <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                    {/* 할 일 이름 */}
                    <input
                        // data-modal-autofocus // ← 여기를 첫 필드로
                        className="w-full bg-coolNeutral-200 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="할 일 이름"
                    />

                    {/* 설명 */}
                    <div>
            <textarea
                rows={4}
                className="w-full bg-white border border-coolNeutral-300 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none resize-none mb-10"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="(선택) 할 일에 대해 간단하게 설명해주세요 (0/200)"
                maxLength={200}
            />
                    </div>

                    {/* 기한 */}
                    <div className="mb-10">
                        <label className="label-1 text-coolNeutral-500 mb-2 block">*기한</label>
                        <AppDateTimePicker value={deadline} onChange={setDeadline} minutesStep={5} />
                    </div>

                    {/* 중요도 */}
                    <div className="mb-10">
                        <div className="label-1 text-coolNeutral-700 mb-1 block">*중요도</div>
                        <div className="flex flex-col gap-2">
                            {(['낮음', '중간', '높음'] as Importance[]).map((opt) => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="importance"
                                        value={opt}
                                        checked={importance === opt}
                                        onChange={() => setImportance(opt)}
                                        className="color-primary-600"
                                    />
                                    <span
                                        className={`label-1-700 ${
                                            importance === opt ? 'text-coolNeutral-800' : 'text-coolNeutral-600'
                                        }`}
                                    >
                    {opt}
                  </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 참고자료(링크) — LinkInputTags를 제어형으로 사용한다고 가정 */}
                    <div className="mb-10">
                        <label className="label-1 text-coolNeutral-700 mb-1 block">참고 자료 (링크)</label>
                        <LinkInputTags value={links} onChange={setLinks} />
                    </div>

                    {/* ===== 액션 아이템 ===== */}
                    <div className="mb-2">
                        {actionItems.map((item, idx) => (
                            <div key={item.id} className="mb-4">
                                <div className="label-1 text-coolNeutral-500 mb-2">액션 {idx + 1}</div>

                                <div className="flex items-center bg-coolNeutral-200 rounded-[6px] pl-4 pr-2 py-2 gap-2">
                                    {/* 좌측: 타이틀 */}
                                    <input
                                        className="flex-1 body-3-500 placeholder-coolNeutral-600 text-coolNeutral-900 focus:outline-none"
                                        placeholder="액션 이름"
                                        value={item.title}
                                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                                    />

                                    {/* 우측: 예상 소요 시간 */}
                                    <div className="shrink-0 flex items-center gap-2">
                                        <span className="body-3-700 text-coolNeutral-400">예상 소요 시간</span>

                                        <div className="flex items-center bg-coolNeutral-300 h-[28px] rounded-[6px] pl-4 pr-2 py-2 gap-2">
                                            <div className="flex items-center gap-2">
                                                {/* h */}
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={999}
                                                        inputMode="numeric"
                                                        className="w-fit text-center rounded-lg bg-coolNeutral-150 focus:outline-none body-3-700 text-coolNeutral-900"
                                                        value={item.hours}
                                                        onChange={(e) => {
                                                            const v = clamp(parseInt(e.target.value || '0', 10), 0, 999);
                                                            updateItem(item.id, { hours: v });
                                                        }}
                                                    />
                                                    <span className="body-3-700 text-coolNeutral-900">h</span>
                                                </div>

                                                {/* m */}
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={59}
                                                        inputMode="numeric"
                                                        className="w-fit text-center rounded-lg bg-coolNeutral-150 focus:outline-none body-3-700 text-coolNeutral-900"
                                                        value={item.minutes}
                                                        onChange={(e) => {
                                                            const v = clamp(parseInt(e.target.value || '0', 10), 0, 59);
                                                            updateItem(item.id, { minutes: v });
                                                        }}
                                                    />
                                                    <span className="body-3-700 text-coolNeutral-900">m</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 구분선 */}
                                        <span className="h-6 w-px bg-coolNeutral-400" />

                                        {/* 삭제 버튼 */}
                                        <button
                                            type="button"
                                            onClick={() => removeActionItem(item.id)}
                                            className="w-5 h-5 rounded-full bg-coolNeutral-200 text-coolNeutral-700 flex items-center justify-center hover:bg-coolNeutral-250 transition"
                                            aria-label="액션 삭제"
                                            title="삭제"
                                        >
                                            <Image src="/icons/ic-x-circle.svg" alt="삭제" width={16} height={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* 하단 + 버튼 */}
                        <button
                            type="button"
                            onClick={addActionItem}
                            className="w-full h-10 rounded-[6px] border border-coolNeutral-300 body-3-700 text-coolNeutral-600 flex items-center justify-center hover:bg-coolNeutral-100 transition"
                            aria-label="액션 아이템 추가"
                        >
                            +
                        </button>
                    </div>
                    {/* ===== /액션 아이템 ===== */}
                </form>
            </div>
        </div>
    );
}
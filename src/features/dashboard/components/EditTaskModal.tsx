'use client';

import Image from "next/image";
import React, { useState } from "react";
import LinkInputTags from "@/shared/components/LinkInputTags";
import AppDateTimePicker from "@/shared/components/AppDateTimePicker";

type EditTaskModalProps = {
    onCloseAction?: () => void;
    onSubmitAction?: () => void;
};

type ActionItem = {
    id: string;
    title: string;
    hours: number;   // 0-999
    minutes: number; // 0-59
};

export default function EditTaskModal({ onCloseAction, onSubmitAction }: EditTaskModalProps) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [importance, setImportance] = useState('중간');

    // 액션 아이템
    const [actionItems, setActionItems] = useState<ActionItem[]>([
        { id: `${Date.now()}`, title: '', hours: 0, minutes: 0 },
    ]);

    const canSubmit = name.trim().length > 0 && !!deadline && importance.trim().length > 0;

    const addActionItem = () =>
        setActionItems(prev => [
            ...prev,
            { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, title: '', hours: 0, minutes: 0 },
        ]);

    const removeActionItem = (id: string) =>
        setActionItems(prev => prev.filter(i => i.id !== id));

    const updateItem = (id: string, patch: Partial<ActionItem>) =>
        setActionItems(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)));

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Number.isFinite(v) ? v : min));

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
                                ? "bg-primary-600 text-common-100 hover:bg-primary-700"
                                : "bg-coolNeutral-250 text-coolNeutral-700 cursor-not-allowed"
                        }`}
                        onClick={canSubmit ? onSubmitAction : undefined}
                    >
                        수정 마치기
                    </button>
                    <button
                        type="button"
                        onClick={onCloseAction}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-coolNeutral-250 bg-white hover:bg-coolNeutral-100 transition"
                    >
                        <Image src="/icons/ic-close.svg" alt="닫기" width={16} height={16} />
                    </button>
                </div>

                <form
                    className="flex flex-col"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* 할 일 이름 */}
                    <div>
                        <input
                            className="w-full bg-coolNeutral-200 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none mb-2"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="할 일 이름"
                        />
                    </div>

                    {/* 설명 */}
                    <div>
                        <textarea
                            rows={4}
                            className="w-full bg-white border border-coolNeutral-300 rounded-[6px] px-4 py-2 body-3-700 text-coolNeutral-900 focus:outline-none resize-none mb-10"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
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
                            {["낮음", "중간", "높음"].map(opt => (
                                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="importance"
                                        value={opt}
                                        checked={importance === opt}
                                        onChange={() => setImportance(opt)}
                                        className="color-primary-600"
                                    />
                                    <span className={`label-1-700 ${importance === opt ? "text-coolNeutral-800" : "text-coolNeutral-600"}`}>
                    {opt}
                  </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 참고자료 */}
                    <div className="mb-10">
                        <label className="label-1 text-coolNeutral-700 mb-1 block">참고 자료 (링크)</label>
                        <LinkInputTags />
                    </div>

                    {/* ===== 액션 아이템 (스샷 스타일) ===== */}
                    <div className="mb-2">
                        {actionItems.map((item, idx) => (
                            <div key={item.id} className="mb-4">
                                <div className="label-1 text-coolNeutral-500 mb-2">액션 {idx + 1}</div>

                                <div className="flex items-center bg-coolNeutral-200 rounded-[6px] pl-4 pr-2 py-2 gap-2">
                                    {/* 좌측: 타이틀 인풋(넓은 회색 캡슐) */}
                                    <input
                                        className="flex-1 body-3-500 placeholder-coolNeutral-600 text-coolNeutral-900 focus:outline-none"
                                        placeholder="액션 이름"
                                        value={item.title}
                                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                                    />

                                    {/* 우측: 예상 소요 시간 + h/m 뱃지 */}
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

                                        {/* 삭제 버튼 (회색 원 X) */}
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

                        {/* 하단 + 버튼 (전폭 캡슐) */}
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
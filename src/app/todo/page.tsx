"use client";

import TodoCard from "@/features/dashboard/components/TodoCard";
import UpcomingTodoCard from "@/features/dashboard/components/UpcomingTodoCard";
import CommonDropdown from "@/components/ui/dropdown/CommonDropdown";
import {usePathname, useRouter} from 'next/navigation';
import {useMemo, useState} from "react";
import AddTaskModal from "@/features/dashboard/components/AddTaskModal";
import Image from "next/image";
import NotificationDropdown from "@/components/ui/dropdown/NotificationDropdown";
import AccountDropdown from "@/components/ui/dropdown/AccountDropdown";

import { DragOverlay, DndContext, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableTodoCard from "@/features/dashboard/components/SortableTodoCard";
import SortableUpcomingCard from "@/features/dashboard/components/SortableUpcomingCard"
import ChatSideModal from "@/features/dashboard/components/ChatSideModal";
import CommonModal from "@/components/ui/modal/CommonModal";
import EditTaskModal from "@/features/dashboard/components/EditTaskModal";
import { ChatTab, ChatItem, CardAction, UpcomingCardData, TodoCardData } from '/type';
import {EditTaskValue} from "@/features/dashboard/type";
import {initialEditForm, initialUpcoming, initialCards, initialTabs, initialChats} from './constants/initialData';

export default function Home() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [upcoming, setUpcoming] = useState<UpcomingCardData[]>(initialUpcoming);

    const [activeUpcomingId, setActiveUpcomingId] = useState<string | null>(null);
    const [upOverlaySize, setUpOverlaySize] = useState<{ width:number; height:number } | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<CardAction>('delete');
    const [targetId, setTargetId] = useState<string | null>(null);

    const [cards, setCards] = useState<TodoCardData[]>(initialCards);

    const [activeId, setActiveId] = useState<string | null>(null);
    const [overlaySize, setOverlaySize] = useState<{width:number; height:number} | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editForm, setEditForm] = useState<EditTaskValue>(initialEditForm);



    const onUpcomingDragStart = (e: DragStartEvent) => {
        setActiveUpcomingId(String(e.active.id));
        const rect = e.active.rect.current.translated ?? e.active.rect.current.initial;
        if (rect) setUpOverlaySize({ width: rect.width, height: rect.height }); // ✅ 첫 프레임에 고정
    };

    const onUpcomingDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            const oldIndex = upcoming.findIndex(u => u.id === active.id);
            const newIndex = upcoming.findIndex(u => u.id === over.id);
            setUpcoming(prev => arrayMove(prev, oldIndex, newIndex));
        }
        setActiveUpcomingId(null);
        setUpOverlaySize(null);
    };

    const activeUpcomingCard = useMemo(
        () => (activeUpcomingId ? upcoming.find(u => u.id === activeUpcomingId) : null),
        [activeUpcomingId, upcoming]
    );

    const onDragStart = (e: DragStartEvent) => {
        setActiveId(String(e.active.id));
        const r = e.active.rect?.current?.initial;
        if (r) setOverlaySize({ width: r.width, height: r.height });
    };

    const onDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;
        const oldIndex = cards.findIndex((c) => c.id === String(active.id));
        const newIndex = cards.findIndex((c) => c.id === String(over.id));
        setCards((prev) => arrayMove(prev, oldIndex, newIndex));
    };
    const activeCard = cards.find(c => c.id === activeId);


    const handleEditSubmit = () => {
        console.log('submit payload:', editForm);
        setEditForm(initialEditForm);
        setEditModalOpen(false);
    };

    const handleEditClose = () => {
        setEditForm(initialEditForm); // ✅ 닫을 때 초기화
        setEditModalOpen(false);
    };

    const onRequestAction = (id: string, action: CardAction) => {
        setTargetId(id);
        setModalAction(action);
        if(action === "delete") {
            setModalOpen(true);
        } else {
            setEditModalOpen(true)
        }
    };

    const handleConfirm = () => {
        if (!targetId) return;
        if (modalAction === 'delete') {
            setCards(prev => prev.filter(c => c.id !== targetId));
        } else if (modalAction === 'edit') {
            // 예: 편집 페이지로 이동 or 인라인 편집 시작
            // router.push(`/todo/${targetId}/edit`)
            console.log('edit', targetId);
        }
    };

    const modalText = {
        title: '오늘 할 일에서 뺄까요?',
        desc: 'Task Box에서 언제든지 다시 추가할 수 있어요!',
        confirm: '삭제하기',
    };
    return (
        <div className="flex space-x-5">
            <div className="flex-1 flex-col pb-[30px] px-[30px] space-y-4 items-start">
                <TaskHeaderBar />
                <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <SortableContext items={cards.map(c => c.id)} strategy={verticalListSortingStrategy}>
                        {cards.map(card => (
                            <SortableTodoCard key={card.id} id={card.id} {...card} onRequestAction={onRequestAction} />
                        ))}
                    </SortableContext>

                    {/* ✅ 크기 고정 Overlay */}
                    <DragOverlay dropAnimation={null}>
                        {activeCard ? (
                            <div
                                style={{
                                    width: overlaySize?.width,
                                    height: overlaySize?.height,
                                }}
                                className="w-full" // 보험
                            >
                                <TodoCard
                                    {...activeCard}
                                    containerStyle={{
                                        width: overlaySize?.width,
                                        height: overlaySize?.height,
                                    }}
                                    containerClassName="transform-gpu"
                                    isDragging
                                    renderHandle={undefined}
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                <CommonModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={modalText.title}
                    description={modalText.desc}
                    cancelText="취소"
                    confirmText={modalText.confirm}
                    onConfirm={handleConfirm}
                />
                <EditTaskModal
                    open={editModalOpen}
                    value={editForm}
                    onChange={setEditForm}
                    onClose={handleEditClose}
                    onSubmit={handleEditSubmit}
                />
            </div>

            <div className="flex-col space-y-4 items-start p-[30px] rounded-tl-2xl border border-gray-200">
                <div className="flex items-center">
                    {/* 좌측 타이틀 */}
                    <span className="body-1-700 text-coolNeutral-650">Task box</span>
                    {/* 정렬 드롭다운 */}
                    <CommonDropdown
                        align="right"
                        offsetY={8}
                        renderButton={({ onClick }) => (
                            <div
                                className="flex items-center rounded-[6px] px-4 py-2"
                                onClick={onClick}
                            >
                                <img src="/icons/ic-sort.svg" alt="정렬" className="w-4 h-4 mr-[10px]"/>
                                <span className="label-1-700 text-coolNeutral-900">기한 순</span>
                            </div>
                        )}
                    >
                        <div className="min-w-[140px] flex flex-col p-[8px]">
                            <button
                                type="button"
                                className="group flex items-center px-4 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition label-1 text-coolNeutral-700 font-semibold"
                                onClick={() => {
                                    console.log("기한 순 선택됨");
                                    // 여기에 정렬 로직 추가
                                }}
                            >
                                기한 순
                            </button>
                            <button
                                type="button"
                                className="group flex items-center px-4 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition label-1 text-coolNeutral-700 font-semibold"
                                onClick={() => {
                                    console.log("중요도 순 선택됨");
                                    // 여기에 정렬 로직 추가
                                }}
                            >
                                중요도 순
                            </button>
                        </div>
                    </CommonDropdown>

                    <div className="flex-1"/>
                    {/* Task 추가하기 드롭다운 */}
                    <CommonDropdown
                        align="right"
                        offsetY={8}
                        renderButton={({onClick}) => (
                            <button
                                type="button"
                                className="flex items-center gap-2 bg-common-100 rounded-[12px] border border-coolNeutral-100 px-5 py-3 label-1 text-coolNeutral-800 shadow"
                                onClick={onClick}
                            >
                                <img src="./icons/ic-plus.svg" alt="할 일 추가" className="w-6 h-6"/>
                                Task 추가하기
                            </button>
                        )}
                    >
                        <div className="min-w-[180px] flex flex-col p-[8px]">
                            <button
                                type="button"
                                className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                                onClick={() => {
                                    router.push('/todo/autoTaskExtract_1');
                                }}
                            >
                                간편 추출하기
                                <img
                                    src="/icons/ic-arrow-right.svg"
                                    alt=">"
                                    className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </button>
                            <button
                                type="button"
                                className="group flex items-center pl-4 pr-2 py-[6px] rounded-[6px] hover:bg-coolNeutral-200 transition justify-between label-1 text-coolNeutral-700 font-semibold"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                직접 입력하기
                                <img
                                    src="/icons/ic-arrow-right.svg"
                                    alt=">"
                                    className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </button>
                        </div>
                    </CommonDropdown>
                    {/* AddTaskModal 모달 */}
                    {showModal && (
                        <AddTaskModal onCloseAction={() => setShowModal(false)}/>
                    )}
                </div>

                <DndContext onDragStart={onUpcomingDragStart} onDragEnd={onUpcomingDragEnd}>
                    <SortableContext items={upcoming.map(u => u.id)} strategy={verticalListSortingStrategy}>
                        {upcoming.map((card) => (
                            <SortableUpcomingCard
                                key={card.id}
                                id={card.id}
                                {...card}
                                lockedSize={activeUpcomingId === card.id ? upOverlaySize : null}
                            />
                        ))}
                    </SortableContext>

                    {/* ✅ 오른쪽도 Overlay로 부드럽게 */}
                    <DragOverlay dropAnimation={null}>
                        {activeUpcomingCard ? (
                            <div
                                style={{
                                    width: upOverlaySize?.width,       // 드래그 시작 시 저장한 픽셀 폭
                                    height: upOverlaySize?.height,     // 드래그 시작 시 저장한 픽셀 높이
                                    boxSizing: "border-box",           // 패딩/보더 포함해 동일하게
                                }}
                                className="w-full"
                            >
                                <UpcomingTodoCard
                                    {...activeUpcomingCard}
                                    containerStyle={{
                                        width: overlaySize?.width,
                                        height: overlaySize?.height,
                                    }}
                                    containerClassName="transform-gpu"
                                    isDragging
                                    renderHandle={undefined}
                                />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>

        </div>
    );
}

function TaskHeaderBar() {
    const [chatModalOpen, setChatModalOpen] = useState(false);
    const tabs = useMemo<ChatTab[]>(
        () => initialTabs,
        []
    );
    const chats = useMemo<ChatItem[]>(
        () => initialChats,
        []
    );

    return (
        <div className="w-full flex items-center gap-4">
            <p className="headline-1 text-common-0">
                Tue, 5
            </p>

            {/* 중앙 여백 (양끝 정렬) */}
            <div className="flex-1" />

            <div
                className="
                  flex items-center justify-between
                  w-[420px] min-w-[320px] max-w-[420px]
                  bg-gradient-to-r from-[#77DDFB] to-[#BEE9F7]
                  rounded-[10px]
                  pl-3 pr-4 py-2
                  shadow
                "
            >
                {/* 아이콘 + 텍스트 */}
                <div className="flex items-center gap-[10px]">
                    {/* 아이콘(깃털) */}
                    <img src="icons/ic-pen.svg" alt="Pen" w-6 h-6/>
                    {/* 텍스트 (굵은 부분과 일반 부분) */}
                    <span className="label-1 text-white">
                        Liquid Glass에 대한 자료를 찾아드릴까요?
                    </span>
                </div>
                {/* AI 채팅 열기 */}
                <button
                    className="flex items-center text-primary-900 label-1"
                    onClick={() => setChatModalOpen(true)}
                >
                    AI 채팅 열기
                    <img src="icons/ic-dropdown.svg" alt="Dropdown" className="w-4 h-4 ml-1" />
                </button>
            </div>





            <ChatSideModal open={chatModalOpen} onClose={() => setChatModalOpen(false)} tabs={tabs} chats={chats}/>
        </div>
    );
}

function Header() {
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
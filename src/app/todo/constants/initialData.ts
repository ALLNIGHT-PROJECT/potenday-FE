import {EditTaskValue} from "@/features/dashboard/type";
import {UpcomingCardData, TodoCardData, ChatTab, ChatItem} from "../type";
export const initialEditForm: EditTaskValue = {
    name: '',
    desc: '',
    deadline: null,
    importance: '중간',
    actionItems: [
        { id: `${Date.now()}`, title: '', hours: 0, minutes: 0 },
    ],
    links: [],
};

export const initialUpcoming: UpcomingCardData[] = [
    {
        id: "u1",
        project: "프로젝트 A",
        title: "할 일 제목",
        importance: "높음",
        estimatedTime: "2시간",
        deadline: "2023-12-31",
        tasks: [
            { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
            { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
            { id: 3, name: "하위 작업 3", estimatedTime: "2h" },
        ],
    },
    {
        id: "u2",
        project: "프로젝트 A",
        title: "할 일 제목",
        importance: "높음",
        estimatedTime: "2시간",
        deadline: "2023-12-31",
        tasks: [
            { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
            { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
            { id: 3, name: "하위 작업 3", estimatedTime: "2h" },
        ],
    },
    {
        id: "u3",
        project: "프로젝트 A",
        title: "할 일 제목",
        importance: "높음",
        estimatedTime: "2시간",
        deadline: "2023-12-31",
        tasks: [
            { id: 1, name: "하위 작업 1", estimatedTime: "1h" },
            { id: 2, name: "하위 작업 2", estimatedTime: "1.5h" },
            { id: 3, name: "하위 작업 3", estimatedTime: "2h" },
        ],
    },
];

// Cards 초기 데이터
export const initialCards: TodoCardData[] = [
    {
        id: "card-1",
        project: "프로젝트 A",
        title: "할 일 제목 1",
        importance: "높음",
        estimatedTime: "2시간",
        deadline: "2023-12-31",
        progress: 75,
        statusLabel: "진행 중",
        description: "이 할 일에 대한 자세한 설명입니다.",
        tasks: [
            { id: 1, name: "하위 작업 1", estimatedTime: "1h", completed: true },
            { id: 2, name: "하위 작업 2", estimatedTime: "1.5h", completed: false },
            { id: 3, name: "하위 작업 3", estimatedTime: "2h", completed: false },
        ],
        references: [
            { name: "참조 문서 1", url: "https://example.com/doc1" },
            { name: "참조 문서 2", url: "https://example.com/doc2" },
        ],
    },
    {
        id: "card-2",
        project: "프로젝트 A",
        title: "할 일 제목 2",
        importance: "높음",
        estimatedTime: "2시간",
        deadline: "2023-12-31",
        progress: 40,
        statusLabel: "대기",
        description: "설명 2",
        tasks: [],
        references: [],
    },
    {
        id: "card-3",
        project: "프로젝트 A",
        title: "할 일 제목 3",
        importance: "보통",
        estimatedTime: "1시간",
        deadline: "2023-12-31",
        progress: 10,
        statusLabel: "대기",
        description: "설명 3",
        tasks: [],
        references: [],
    },
];

export const initialTabs: ChatTab[] = [
    { id: "t0", label: "Liquid Glass 사전작업", active: true },
    { id: "t1", label: "새로운 채팅 1" },
    { id: "t2", label: "새로운 채팅 2" },
];

export const initialChats: ChatItem[] = [
    { id: "c1", title: "기획 업무 도움요청", unread: 2 },
    { id: "c2", title: "개발 업무 도움요청" },
    { id: "c3", title: "Liquid Glass 사전작업" },
    { id: "c4", title: "새로운 채팅 1" },
    { id: "c5", title: "새로운 채팅 2" },
];



export type ChatTab = {
    id: string;
    label: string;
    active?: boolean;
};

export type ChatItem = {
    id: string;
    title: string;
    unread?: number;
};

export type CardAction = 'edit' | 'delete';

export type UpcomingCardData = {
    id: string;
    project: string;
    title: string;
    importance: "낮음" | "보통" | "높음";
    estimatedTime: string;
    deadline: string;
    tasks: { id: number; name: string; estimatedTime: string }[];
};

export type TodoCardData = {
    id: string;
    project: string;
    title: string;
    importance: string;
    estimatedTime: string;
    deadline: string;
    progress: number;
    statusLabel: string;
    description: string;
    tasks: { id: number; name: string; estimatedTime: string; completed: boolean }[];
    references: { name: string; url: string }[];
};
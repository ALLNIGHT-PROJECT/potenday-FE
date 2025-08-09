export type Importance = '낮음' | '중간' | '높음';

export type ActionItem = {
    id: string;
    title: string;
    hours: number;   // 0-999
    minutes: number; // 0-59
};

export type EditTaskValue = {
    name: string;
    desc: string;
    deadline: Date | null;
    importance: Importance;
    actionItems: ActionItem[];
    links: string[]; // LinkInputTags가 제어형으로 받을 링크 목록
};

export type UpcomingTodoTask = {
    id: number;
    name: string;
    estimatedTime: string;
};

export type UpcomingTodoDetailProps = {
    project: string;
    title: string;
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
    tasks: UpcomingTodoTask[];
};

export type UpcomingTodoHeaderProps = {
    project: string;
    title: string;
};

export type UpcomingTodoMetaInfoProps = {
    importance: '낮음' | '보통' | '높음';
    estimatedTime: string;
    deadline: string;
};
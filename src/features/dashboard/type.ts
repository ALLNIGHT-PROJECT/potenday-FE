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

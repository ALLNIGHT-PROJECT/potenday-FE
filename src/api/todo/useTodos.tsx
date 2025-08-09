import { useMutation } from '@tanstack/react-query';
import { sendRequest } from "@/api/apiClient";

export type SubTask = {
    subTaskId: number;
    title: string;
    estimatedMin: number;
    isChecked: boolean;
};

export type Todo = {
    todoId: number;
    title: string;
    priority: 'LOW' | 'MID' | 'HIGH';
    dueDate: string;
    totalEstimatedTime: number;
    isCompleted: boolean;
    orderIdx: number;
    progressRate: number;
    subTasks: SubTask[];
};

const fetchTodos = async () => {
    try {
        const response = await sendRequest('GET', '/todo');
        return response.data
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;  // 에러를 다시 던져서 `useMutation`에서
    }
}

export const useTodos = () => {
    return useMutation({
        mutationFn: fetchTodos,
    });
};


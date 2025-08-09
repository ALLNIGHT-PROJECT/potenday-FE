import { useMutation } from '@tanstack/react-query';
import { sendRequest } from "@/api/apiClient";  // apiClient 임포트

export type UpcomingSubTask = {
    subTaskId: number;
    title: string;
    estimatedMin: number;
};

export type UpcomingTodo = {
    todoId: number;
    title: string;
    dueDate: string;
    subTasks: UpcomingSubTask[];
};


const fetchTasks = async () => {
    try {
        const response = await sendRequest('GET', '/tasks');
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;  // 에러를 다시 던져서 `useMutation`에서 처리할 수 있게 함
    }
}

export const useTasks = () => {
    return useMutation({
        mutationFn: fetchTasks,
    });
}
type CommonResponse<T> = {
    isSuccess: boolean;
    data: T | null;
    error?: {
        code: string;
        message: string;
    };
};
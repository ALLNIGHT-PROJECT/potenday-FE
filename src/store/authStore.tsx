import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string) => void;
    clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,

    // 전체 토큰을 설정
    setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

    // 개별 토큰 설정
    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),

    // 토큰 삭제
    clear: () => set({ accessToken: null, refreshToken: null }),
}));
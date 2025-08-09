import { useAuthStore } from "@/store/authStore";

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
    const { accessToken, refreshToken } = useAuthStore.getState();

    // 첫 번째 요청: 액세스 토큰 포함
    const res = await fetch(input, {
        ...init,
        credentials: 'include',
        headers: {
            ...(init.headers || {}),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            'Content-Type': 'application/json',
        },
    });

    // 액세스 토큰 만료 시 (401 에러) 리프레시 토큰으로 갱신 시도
    if (res.status === 401 && refreshToken) {
        const refreshed = await refreshAccessToken(refreshToken); // 리프레시 토큰을 사용하여 액세스 토큰 갱신
        if (refreshed) {
            // 갱신된 액세스 토큰으로 재요청
            const newAccessToken = useAuthStore.getState().accessToken;
            return await fetch(input, {
                ...init,
                credentials: 'include',
                headers: {
                    ...(init.headers || {}),
                    Authorization: `Bearer ${newAccessToken}`,
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    return res;
}

async function refreshAccessToken(refreshToken: string) {
    // 서버에 리프레시 토큰을 보내서 새로운 액세스 토큰을 받는 로직
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/reissue/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }), // 리프레시 토큰을 함께 전송
    });

    if (!res.ok) {
        useAuthStore.getState().setAccessToken(null); // 갱신 실패 시 액세스 토큰 제거
        return false;
    }

    const { accessToken } = await res.json();
    useAuthStore.getState().setAccessToken(accessToken); // 새 액세스 토큰 저장
    return true;
}
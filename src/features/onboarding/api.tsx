export type LoginResponse = {
    token: string;
    refreshToken: string;
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            console.error("Login failed", await res.text());
            return null;
        }

        const json = await res.json();
        const accessToken = json?.data?.token;
        const refreshToken = json?.data?.refreshToken;

        if (!accessToken || !refreshToken) {
            alert("토큰 응답이 올바르지 않습니다.");
            return null;
        }

        return { token: accessToken, refreshToken };
    } catch (error) {
        console.error("Error during login:", error);
        alert("로그인 처리 중 오류가 발생했습니다.");
        return null;
    }
};
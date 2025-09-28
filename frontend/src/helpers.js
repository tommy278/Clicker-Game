export function showMessage(text, status, setState, duration = 3000) {
    setState({text: text, type: status});
    setTimeout(() => setState({text: "", type: ""}), duration)
}

export async function refreshToken () {
    const refresh = localStorage.getItem("REFRESH_TOKEN")
    if (!refresh) return null;

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ refresh })
        });

        if(!res.ok) return null
        const data = await res.json()
        localStorage.setItem("ACCESS_TOKEN", data.access)
        return data.access
    } catch(error) {
        console.error("Refresh failed", err)
        return null;
    }
}

export async function patchProfile(token, content) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(content)
        });

        if (res.status === 401) {
            const newToken = await refreshToken();
            if(!newToken) throw new Error("Not Authorized, refresh failed")
            return patchProfile(newToken, content)
        }

        if (!res.ok) {
            throw new Error("Failed to patch profile");
        }
        return await res.json();

    } catch (error) {
        console.error("patchProfile error", error)
        throw error
    }
}

export async function fetchProfile(token) {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    if (res.status === 401) {
            const newToken = await refreshToken()
            if (!newToken) throw new Error("Unauthorized, refresh failed")
            return fetchProfile(newToken)
        }
    if (!res.ok) throw new Error("Failed to fetch profile")
    return await res.json()
}
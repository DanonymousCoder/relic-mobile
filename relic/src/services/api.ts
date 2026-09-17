const API_BASE_URL = 'https://192.168.1.161:8080'

export class RelicApiError extends Error {
    code: string
    constructor(message: string, code: string) {
        super(message)
        this.code = code
    }
}

async function fetchClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const headers = new Headers(options.headers)

    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
    }

    const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include"
    })

    if (response.status === 204) {
        return null as unknown as T
    }

    const data = await response.json()

    if (!response.ok) {
        throw new RelicApiError(
            data.error || 'An unexpected network error occured',
            data.code || 'unknown_error'
        )
    }
    return data as T
}

export const login = (email: string, password: string) => {
    return fetchClient('/api/auth/login',  {
        method: 'POST',
        body: JSON.stringify({email, password})
    })
}

export const signup = (email: string, password: string) => {
    return fetchClient('/api/auth/signup',  {
        method: 'POST',
        body: JSON.stringify({email, password})
    })
}

export const logout = () => {
    return fetchClient('api/auth/logout',  {
        method: 'POST'
    })
}

export const getShoots = () => {
    return fetchClient('/api/shoots')
}

export const getShootDetails = (shootId: string) => {
    return fetchClient(`/api/shoots/${shootId}`)
}

export const getTimeline = (shootId: string) => {
    return fetchClient(`/api/shoots/${shootId}/timeline`)
}

export const createShoot = (name: string) => {
    return fetchClient(`/api/shoots/`, {
        method: "POST",
        body: JSON.stringify({ name })
    })
}

export const uploadFiles = (shootId: string, formData: FormData) => {
    return fetchClient(`/api/shoots/${shootId}/files`, {
        method: "POST",
        body: formData
    })
}

export const triggerArchive = (shootId: string) => {
    return fetchClient(`/api/shoots/${shootId}/archive`, {
        method: "POST"
    })
}
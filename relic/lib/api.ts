const API_URL = ''

export async function fetchShoots() {
    const response = await fetch(`${API_URL}/shoots`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('Failed to load archives.')
    }

    return response.json()
}
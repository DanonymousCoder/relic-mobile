const API_BASE_URL = 'https://192.168.1.161:8080'

export class RelicApiError extends Error {
    code: string
    constructor(message: string, code: string) {
        super(message)
        this.code = code
    }
}
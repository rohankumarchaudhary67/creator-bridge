interface ApiErrorTypes {
    statusCode: number;
    message: string;
    success: boolean;
}

class ApiError implements ApiErrorTypes {
    statusCode: number;
    message: string;
    success: boolean;

    constructor(statusCode: number, message: string, success: boolean = false) {
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
    }
}

export { ApiError };

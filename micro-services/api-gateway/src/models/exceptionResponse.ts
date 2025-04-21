export interface ExceptionResponse {
    path: string;
    message: string;
    dateTime: string;
    errors: FieldError[];
}

export interface FieldError {
    field: string;
    message: string;
}
export interface SseResponseModel {
    update: (options: UpdateOptions) => void;
    listeners: any;
    data: unknown;
    close: () => void;
    url: string;
    readyState: number;
    withCredentials: boolean;
    onopen: (() => void) | undefined;
    onmessage: (event: any) => void;
    onerror: (error: { errorCode: number }) => void;
    errorCode: number | undefined;
    errorMessage: string | undefined;
    lastEventId: string;
}

interface UpdateOptions {
    headers?: Headers;
}

interface Headers {
    [key: string]: string;
}

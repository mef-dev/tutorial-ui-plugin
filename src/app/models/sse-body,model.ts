export class SseBodyModel {
    message: string;
    ServiceId: number;

    constructor(message: string, serviceId: number) {
        this.message = message;
        this.ServiceId = serviceId;
    }

}

export class PluginEndpointsResponseModel {
    id: number;
    name: string;
    isComplete: boolean

    constructor(id: number, name: string, isComplete: boolean) {
        this.id = id;
        this.name = name;
        this.isComplete = isComplete;
    }

}

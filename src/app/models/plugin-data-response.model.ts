export interface PluginDataResponseModel {
    workflowId: number;
    version: number;
    definition: string;
    name: string;
    description: string;
    lastModifiedDate: string;
    createdDate: string;
    lastCompileSuccess: boolean;
    lastCompileDiagnostic: string;
    createdBy: string;
    libraryName: string;
    libraryId: number;
    libraryType: string;
    tenantName: string;
    lastPublishDate: string;
    publishedBy: number;
    originWorkflowId: number;
    originVersion: number;
    shareUrl: string;
    instances: unknown[];
    events: unknown[];
}

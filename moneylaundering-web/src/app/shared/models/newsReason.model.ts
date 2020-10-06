export class NewsReason {
    id: number;
    newsReasonTypeId: number;
    description: string;
    global: boolean;

    /**
     *
     */
    constructor(id?: number, newsReasonTypeId?: number, description?: string, global?: boolean) {
        this.id = id;
        this.newsReasonTypeId = newsReasonTypeId;
        this.description = description;
        this.global = global;
    }
}
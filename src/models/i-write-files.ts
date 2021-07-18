export interface IWriteFiles {
    path: string
    singular: string
    plural: string
    className: string
    fields: any[]

    writeProvider(): Promise<any>;

    writeService(): Promise<any>;

    writeEntity(): Promise<any>;

    writeCreateDto(): Promise<any>;

    writeUpdateDto(): Promise<any>;

    writeModule(): Promise<any>;
}
module qgrid {
    export interface IServerResponseObject<T> {
        page: number;
        records: number;
        total: number;
        rows: T[];
    }
} 
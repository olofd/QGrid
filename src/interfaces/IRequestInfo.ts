module qgrid {
    export interface IRequestInfo {
        id: string;
        rows: number;
        page: number;
        rguid: string;
        search: boolean;
        sord: string;
        sf: string;
        acc: string;
        et: string;

    }
}
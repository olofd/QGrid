module qgrid {
    export interface IDefaultModelGetter {
        getNewDefault: <T>() => T;
    }
}
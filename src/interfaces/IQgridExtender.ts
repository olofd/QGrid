module qgrid {
    export interface IQgridExtender {
        deepExtend: <T>(destination: T, source: T) => T
    }
}
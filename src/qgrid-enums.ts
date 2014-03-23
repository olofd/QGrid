module qgrid{
    export enum SearchOp {
        IsEqualTo,
        IsNotEqualTo,
        IsLessThan,
        IsLessOrEqualTo,
        IsGreaterThan,
        IsGreaterOrEqualTo,
        IsIn,
        IsNotIn,
        BeginsWith,
        DoesNotBeginWith,
        EndsWith,
        DoesNotEndWith,
        Contains,
        DoesNotContain,
        ManualFilter

    }
    export enum DataType{
        DateTime 

    }
    export enum IQGridColumnHeaderStyle{
        None,
        SearchTextBox,
        TypeaheadTexBox,
        DatePickerTextBox
       

    }
}
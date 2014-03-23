var qgrid;
(function (qgrid) {
    (function (SearchOp) {
        SearchOp[SearchOp["IsEqualTo"] = 0] = "IsEqualTo";
        SearchOp[SearchOp["IsNotEqualTo"] = 1] = "IsNotEqualTo";
        SearchOp[SearchOp["IsLessThan"] = 2] = "IsLessThan";
        SearchOp[SearchOp["IsLessOrEqualTo"] = 3] = "IsLessOrEqualTo";
        SearchOp[SearchOp["IsGreaterThan"] = 4] = "IsGreaterThan";
        SearchOp[SearchOp["IsGreaterOrEqualTo"] = 5] = "IsGreaterOrEqualTo";
        SearchOp[SearchOp["IsIn"] = 6] = "IsIn";
        SearchOp[SearchOp["IsNotIn"] = 7] = "IsNotIn";
        SearchOp[SearchOp["BeginsWith"] = 8] = "BeginsWith";
        SearchOp[SearchOp["DoesNotBeginWith"] = 9] = "DoesNotBeginWith";
        SearchOp[SearchOp["EndsWith"] = 10] = "EndsWith";
        SearchOp[SearchOp["DoesNotEndWith"] = 11] = "DoesNotEndWith";
        SearchOp[SearchOp["Contains"] = 12] = "Contains";
        SearchOp[SearchOp["DoesNotContain"] = 13] = "DoesNotContain";
        SearchOp[SearchOp["ManualFilter"] = 14] = "ManualFilter";
    })(qgrid.SearchOp || (qgrid.SearchOp = {}));
    var SearchOp = qgrid.SearchOp;
    (function (DataType) {
        DataType[DataType["DateTime"] = 0] = "DateTime";
    })(qgrid.DataType || (qgrid.DataType = {}));
    var DataType = qgrid.DataType;
    (function (IQGridColumnHeaderStyle) {
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["None"] = 0] = "None";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["SearchTextBox"] = 1] = "SearchTextBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["TypeaheadTexBox"] = 2] = "TypeaheadTexBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["DatePickerTextBox"] = 3] = "DatePickerTextBox";
    })(qgrid.IQGridColumnHeaderStyle || (qgrid.IQGridColumnHeaderStyle = {}));
    var IQGridColumnHeaderStyle = qgrid.IQGridColumnHeaderStyle;
})(qgrid || (qgrid = {}));
//# sourceMappingURL=qgrid-enums.js.map

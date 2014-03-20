using System;
using System.Linq;


namespace QGrid
{
    public static class InternalFilterer
    {

        private static string CreateLinqFilter<T>(GridFilterer<T> grid, SearchArguments args)
        {
            var column = grid.GridModel.Columns.Find(c => c.DataField == args.SearchColumn);
            var filterExpressionCompare = (column.DataType == typeof(string)) ? "{0} {1} \"{2}\"" : "{0} {1} {2}";
            if (column.DataType == typeof(string) && args.SearchString.Contains("::"))
            {

            }
            if (column.DataType == typeof(DateTime))
            {

                var time = DateTime.Parse(args.SearchString);
                var query = string.Format("({0},{1},{2})", time.Year, time.Month, time.Day);
                filterExpressionCompare = "{0} {1} DateTime" + query;

            }
            return (string.Format("{0} != null AND ", args.SearchColumn) + GetExpression(filterExpressionCompare, args, false, column.DataType));
        }

        private static string GetExpression(string filterExpressionCompare, SearchArguments args, bool caseSensitive, Type dataType)
        {
            var str = caseSensitive ? args.SearchString : args.SearchString.ToLower();
            var searchColumn = args.SearchColumn;
            if (((dataType != null) && (dataType == typeof(string))) && !caseSensitive)
            {
                searchColumn = string.Format("{0}.ToLower()", args.SearchColumn);
            }
            switch (args.SearchOpearator)
            {
                case SearchOpearator.IsEqualTo:
                    return string.Format(filterExpressionCompare, searchColumn, "=", str);

                case SearchOpearator.IsNotEqualTo:
                    return string.Format(filterExpressionCompare, searchColumn, "<>", str);

                case SearchOpearator.IsLessThan:
                    return string.Format(filterExpressionCompare, searchColumn, "<", str);

                case SearchOpearator.IsLessOrEqualTo:
                    return string.Format(filterExpressionCompare, searchColumn, "<=", str);

                case SearchOpearator.IsGreaterThan:
                    return string.Format(filterExpressionCompare, searchColumn, ">", str);

                case SearchOpearator.IsGreaterOrEqualTo:
                    return string.Format(filterExpressionCompare, searchColumn, ">=", str);

                case SearchOpearator.BeginsWith:
                    return string.Format("{0}.StartsWith(\"{1}\")", searchColumn, str);

                case SearchOpearator.DoesNotBeginWith:
                    return string.Format("!{0}.StartsWith(\"{1}\")", searchColumn, str);

                case SearchOpearator.EndsWith:
                    return string.Format("{0}.EndsWith(\"{1}\")", searchColumn, str);

                case SearchOpearator.DoesNotEndWith:
                    return string.Format("!{0}.EndsWith(\"{1}\")", searchColumn, str);

                case SearchOpearator.Contains:
                    return string.Format("{0}.Contains(\"{1}\")", searchColumn, str);

                case SearchOpearator.DoesNotContain:
                    return string.Format("!{0}.Contains(\"{1}\")", searchColumn, str);
            }
            throw new Exception("Invalid search operation.");
        }

        public static string CreateWhere<T>(GridFilterer<T> grid, RequestParams queryString)
        {
            var str = " && ";
            var query = "";
       
            foreach (var column in grid.GridModel.Columns)
            {
                var searchValue = "";
                var searchColumn = queryString.SearchObjects.FirstOrDefault(b => b.Name == column.DataField);
                if (searchColumn != null)
                {
                    searchValue = searchColumn.Value;
                }
                if (!string.IsNullOrEmpty(searchValue))
                {
                    if (searchValue.Contains("::"))
                    {
                        var dateTimeArray = searchValue.Split(new string[] { "::" }, StringSplitOptions.None);
                        column.SearchToolBarOpearator = SearchOpearator.IsGreaterOrEqualTo;
                        query = ConstructQuery(grid, dateTimeArray[0].Trim(), column, query, str);

                        column.SearchToolBarOpearator = SearchOpearator.IsLessOrEqualTo;
                        query = ConstructQuery(grid, dateTimeArray[1].Trim(), column, query, str);
                    }

                    else if (searchValue.Contains("||"))
                    {
                        var manyArgsArray = searchValue.Split(new string[] { "||" }, StringSplitOptions.None);
                        var first = true;
                        var addParentasiesAtEnd = false;
                        foreach (var arg in manyArgsArray)
                        {
                            var appender = " || ";
                            if (first && query.Length != 0)
                            {
                                appender = str + "(";
                                addParentasiesAtEnd = true;
                            }

                            var orArgument = ConstructQuery(grid, arg.Trim(), column, query, appender);
                            query = orArgument;
                            first = false;
                        }
                        if (addParentasiesAtEnd)
                            query += ")";
                    }
                    else if (searchValue.Contains("&&"))
                    {
                        var manyArgsArray = searchValue.Split(new string[] { "&&" }, StringSplitOptions.None);
                        query = manyArgsArray.Aggregate(query, (current, arg) => ConstructQuery(grid, arg.Trim(), column, current, str));
                    }
                    else
                    {
                        query = ConstructQuery(grid, searchValue, column, query, str);
                    }
                }

            }
            return query;
        }
        //public static string CreateWhere<T>(GridFilterer<T> grid, string filters)
        //{
        //    var search = new JavaScriptSerializer().Deserialize<MultiFilter>(filters);
        //    var str = "";
        //    foreach (var rule in search.rules)
        //    {
        //        var arguments2 = new SearchArguments
        //        {
        //            SearchColumn = rule.field,
        //            SearchString = rule.data,
        //            SearchOpearator = SearchOperationHelper.GetSearchOperationFromString(rule.op)
        //        };
        //        if (arguments2.SearchOpearator != SearchOpearator.ManualFilter)
        //        {
        //            var args = arguments2;
        //            var query = (str.Length > 0) ? (" " + search.groupOp + " ") : "";
        //            str = str + query + CreateLinqFilter(grid, args);
        //        }
        //    }
        //    return str;
        //}

        public static string CreateWhere<T>(GridFilterer<T> grid, string searchField, string searchString, string searchOper)
        {
            var str = " && ";
            var query = "";
            
            var arguments2 = new SearchArguments
            {
                SearchColumn = searchField,
                SearchString = searchString,
                SearchOpearator = SearchOperationHelper.GetSearchOperationFromString(searchOper)
            };
            var args = arguments2;
            var searchValue = (query.Length > 0) ? str : "";
            var str4 = CreateLinqFilter(grid, args);
            return (query + searchValue + str4);
        }

        public static string CreateWhere<T>(GridFilterer<T> grid, string searchField, string searchString, SearchOpearator searchOper)
        {
            var str = " && ";
            var query = "";
            
            var arguments2 = new SearchArguments
            {
                SearchColumn = searchField,
                SearchString = searchString,
                SearchOpearator = searchOper
            };
            var args = arguments2;
            var searchValue = (query.Length > 0) ? str : "";
            var str4 = CreateLinqFilter(grid, args);
            return (query + searchValue + str4);
        }

        private static string ConstructQuery<T>(GridFilterer<T> grid, string searchValue, GridColumn column, string query, string str)
        {

            var searchOperationModel = SearchOperationHelper.GetSearchOperation(new SearchOperationModel
            {
                Column = column,
                SearchOpearator = column.SearchToolBarOpearator,
                Value = searchValue
            });
            var arguments2 = new SearchArguments
            {
                SearchColumn = column.DataField,
                SearchString = searchOperationModel.Value,
                SearchOpearator = searchOperationModel.SearchOpearator
            };
            var args = arguments2;
            var str4 = (query.Length > 0) ? str : "";
            var str5 = CreateLinqFilter(grid, args);
            query = query + str4 + str5;

            return query;
        }

    }
}


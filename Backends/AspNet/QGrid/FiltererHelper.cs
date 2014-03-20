using System;

namespace QGrid
{
    public static class SearchOperationHelper
    {
        public static SearchOpearator GetSearchOperationFromString(string searchOperation)
        {
            switch (searchOperation)
            {
                case "eq":
                    return SearchOpearator.IsEqualTo;

                case "ne":
                    return SearchOpearator.IsNotEqualTo;

                case "lt":
                    return SearchOpearator.IsLessThan;

                case "le":
                    return SearchOpearator.IsLessOrEqualTo;

                case "gt":
                    return SearchOpearator.IsGreaterThan;

                case "ge":
                    return SearchOpearator.IsGreaterOrEqualTo;

                case "in":
                    return SearchOpearator.IsIn;

                case "ni":
                    return SearchOpearator.IsNotIn;

                case "bw":
                    return SearchOpearator.BeginsWith;

                case "bn":
                    return SearchOpearator.DoesNotBeginWith;

                case "ew":
                    return SearchOpearator.EndsWith;

                case "en":
                    return SearchOpearator.DoesNotEndWith;

                case "cn":
                    return SearchOpearator.Contains;
                case "nc":
                    return SearchOpearator.DoesNotContain;
                case "mf":
                    return SearchOpearator.ManualFilter;
            }
            throw new Exception("Search operation not known: " + searchOperation);
        }

        public static string GetStringFromSearchOperation<T>(SearchOpearator searchOpearator)
        {
            switch (searchOpearator)
            {
                case SearchOpearator.IsEqualTo:
                    return "eq";
                case SearchOpearator.IsNotEqualTo:
                    return "ne";
                case SearchOpearator.IsLessThan:
                    return "lt";
                case SearchOpearator.IsLessOrEqualTo:
                    return "le";
                case SearchOpearator.IsGreaterThan:
                    return "gt";
                case SearchOpearator.IsGreaterOrEqualTo:
                    return "ge";
                case SearchOpearator.IsIn:
                    return "in";
                case SearchOpearator.IsNotIn:
                    return "ni";
                case SearchOpearator.BeginsWith:
                    return "bw";
                case SearchOpearator.DoesNotBeginWith:
                    return "bn";
                case SearchOpearator.EndsWith:
                    return "ew";
                case SearchOpearator.DoesNotEndWith:
                    return "en";
                case SearchOpearator.Contains:
                    return "cn";
                case SearchOpearator.DoesNotContain:
                    return "nc";
                case SearchOpearator.ManualFilter:
                    return "mf";
                default:
                    throw new ArgumentOutOfRangeException("searchOpearator");
            }
        }
        public static SearchOperationModel GetSearchOperation(SearchOperationModel searchOperationModel)
        {


            if (searchOperationModel.Value.StartsWith("!*") && searchOperationModel.Value.EndsWith("*!"))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.DoesNotContain;

            }
            else
            {
                if (searchOperationModel.Value.StartsWith("!*"))
                {
                    searchOperationModel.SearchOpearator = SearchOpearator.DoesNotEndWith;
                }
                else if (searchOperationModel.Value.EndsWith("*!"))
                {
                    searchOperationModel.SearchOpearator = SearchOpearator.DoesNotBeginWith;
                }
            }


            if (searchOperationModel.Value.StartsWith("*") && searchOperationModel.Value.EndsWith("*"))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.Contains;
            }
            else
            {
                if (searchOperationModel.Value.StartsWith("*"))
                {
                    searchOperationModel.SearchOpearator = SearchOpearator.EndsWith;
                }
                else if (searchOperationModel.Value.EndsWith("*"))
                {
                    searchOperationModel.SearchOpearator = SearchOpearator.BeginsWith;
                }
            }

            if (searchOperationModel.Value.StartsWith(">"))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.IsGreaterThan;

            }
            if (searchOperationModel.Value.StartsWith("<"))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.IsLessThan;
            }

            if (searchOperationModel.Value.StartsWith(">="))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.IsGreaterOrEqualTo;
            }
            if (searchOperationModel.Value.StartsWith("<="))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.IsLessOrEqualTo;
            }
            if (searchOperationModel.Value.StartsWith("="))
            {
                searchOperationModel.SearchOpearator = SearchOpearator.IsEqualTo;
            }



            searchOperationModel.Value = searchOperationModel.Value.Replace(">", "");
            searchOperationModel.Value = searchOperationModel.Value.Replace("<", "");
            searchOperationModel.Value = searchOperationModel.Value.Replace("=", "");
            searchOperationModel.Value = searchOperationModel.Value.Replace("!*", "");
            searchOperationModel.Value = searchOperationModel.Value.Replace("*!", "");
            searchOperationModel.Value = searchOperationModel.Value.Replace("*", "");
            return searchOperationModel;
        }
    }
}
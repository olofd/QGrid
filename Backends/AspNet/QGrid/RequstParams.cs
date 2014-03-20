using System;
using System.Collections.Generic;
using System.Linq;

namespace QGrid
{
    public class RequestParams
    {
        public string GridId { get { return requestInfo.id; } }
        public int Rows { get { return requestInfo.rows; } }

        private ExportType _exportType;
        public ExportType ExportType
        {
            get
            {
                if (_exportType != ExportType.None) return _exportType;
                if (!(Enum.TryParse(requestInfo.et, out _exportType)))
                {

                }
                return _exportType;
            }

        }

        public int Page { get { return requestInfo.page; } }
        public string AutoCompleteColumn { get { return requestInfo.acc; } }
        public string RequestGuid { get { return requestInfo.rguid; } }
        public string PrimaryKey { get { return requestInfo.pk; } }
        public bool Search { get { return requestInfo.search; } }
        public string SortOrder { get { return requestInfo.sord; } }
        public string SortField { get { return requestInfo.sf; } }
        private IEnumerable<SearchObject> internalSearchObject { get; set; }
        public IEnumerable<SearchObject> SearchObjects
        {
            get
            {
                if (internalSearchObject == null)
                {
                    internalSearchObject = requestSearchInfo.Select(b => new SearchObject
                    {
                        Name = b.n,
                        Value = b.v,
                        SearchOpearator =  SearchOperationHelper.GetSearchOperationFromString(b.so)
                    });
                }
                return internalSearchObject;
            }
        }
        public RequestObject requestInfo { get; set; }
        public List<RequestSearchObject> requestSearchInfo { get; set; }
    }
    public class SearchObject
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public SearchOpearator SearchOpearator { get; set; }
    }

    public class RequestObject
    {
        public string acc { get; set; }
        public string id { get; set; }
        public int rows { get; set; }
        public int page { get; set; }
        public string rguid { get; set; }
        public string pk { get; set; }
        public string sf { get; set; }
        public string sord { get; set; }
        public string et { get; set; }
        public bool search { get; set; }
        public List<RequestSearchObject> so { get; set; }
    }
    public class RequestSearchObject
    {
        public string n { get; set; }
        public string so { get; set; }
        public string v { get; set; }
    }




}
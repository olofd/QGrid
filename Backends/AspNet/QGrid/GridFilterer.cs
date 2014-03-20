using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using QGrid.Export;

namespace QGrid
{
    public class GridFilterer<T>
    {
        public GridModel GridModel { get; set; }
        public bool UseAsync { get; set; }
        private List<IFileExporter<T>> Exporters { get; set; }
        public GridFilterer(bool useAsync = true)
        {
            UseAsync = useAsync;
        }


        public async Task<JsonResponse<T>> FilterDataSource(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            iqueryable = RunQueryableFilters(iqueryable, reqParams);
            var totalRowCount = iqueryable.Count();
            var totalPagesCount = (int)Math.Ceiling(totalRowCount / ((float)reqParams.Rows));
            iqueryable = RunQueryablePaging(iqueryable, reqParams);

            List<T> data = null;
            if (UseAsync)
            {
                data = await iqueryable.ToListAsync();
            }
            else
            {
                data = iqueryable.ToList();
            }
            var response = new JsonResponse<T>(reqParams.Page, totalPagesCount, totalRowCount, reqParams.Rows,
                data.Count, data);
            return response;
        }

        public async Task<List<string>> AutoComplete(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            iqueryable = RunQueryableFilters(iqueryable, reqParams);
            var result =
                 ((IQueryable<string>) iqueryable.Select(reqParams.AutoCompleteColumn)).Where(
                        b => !string.IsNullOrEmpty(b))
                        .Distinct()
                        .OrderBy(b => b)
                        .Take(14);


            List<string> data = null;
            if (UseAsync)
            {
                data = await result.ToListAsync();
            }
            else
            {
                data = result.ToList();
            }
            return data;
        }
        public bool InternalExport(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            SetupExporters();
            var queryable = GetFilteredQueryable(iqueryable, reqParams);
            foreach (var exporter in Exporters)
            {
                if (exporter.ExportType == reqParams.ExportType)
                {
                    exporter.ExportToHttpResponse(HttpContext.Current.Response, queryable, GridModel.Columns,
                        reqParams.GridId + " - " + DateTime.Now.ToShortDateString());
                }

            }
            return true;
        }

        private IQueryable<T> RunQueryablePaging(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            iqueryable = iqueryable.Skip(((reqParams.Page - 1) * reqParams.Rows)).Take(reqParams.Rows);
            return iqueryable;
        }

        private IQueryable<T> RunQueryableFilters(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            GridModel = GridCacheController.GetOrAddGridModel(reqParams.GridId, typeof(T));
            if (reqParams.Search)
            {
                try
                {

                    var whereClause = InternalFilterer.CreateWhere(this, reqParams);
                    if (!string.IsNullOrEmpty(whereClause))
                        iqueryable = iqueryable.Where(whereClause, new object[0]);

                }
                catch (Exception ex)
                {

                    return null;
                }
            }
            if (!string.IsNullOrEmpty(reqParams.SortField))
            {
                iqueryable = iqueryable.OrderBy(GetSortExpression(reqParams.SortField, reqParams.SortOrder),
                    new object[0]);
            }
            return iqueryable;
        }

        private static string GetSortExpression(string sortExpression, string sortDirection)
        {
            var builder = new StringBuilder();
            foreach (var str in sortExpression.Split(new[] { ',' }).ToList())
            {
                if (str.Trim().Length == 0)
                {
                    break;
                }
                var list2 = str.Trim().Split(new[] { ' ' }).ToList();
                var str2 = list2[0];
                var str3 = sortDirection;
                if (list2.Count > 1)
                {
                    str3 = list2[1];
                }
                if (builder.Length > 0)
                {
                    builder.Append(",");
                }
                builder.AppendFormat("{0} {1}", str2, str3);
            }
            return builder.ToString();
        }



        private IQueryable<T> GetFilteredQueryable(IQueryable<T> iqueryable, RequestParams reqParams)
        {
            iqueryable = RunQueryableFilters(iqueryable, reqParams);
            iqueryable = RunQueryablePaging(iqueryable, reqParams);
            return iqueryable;
        }
        private void SetupExporters()
        {
            if (Exporters == null)
            {
                Exporters = new List<IFileExporter<T>>
                {
                    new ExcelExporter<T>(),
                    new PdfExporter<T>(),
                    new CsvExporter<T>()
                };
            }
        }

    }

}
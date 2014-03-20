using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace QGrid.Export
{
    public class ExcelExporter<T> : IFileExporter<T>
    {
        public ExportType ExportType { get; set; }
        public ExcelExporter()
        {
            ExportType = ExportType.Excel;
        }
        public void ExportToHttpResponse(HttpResponse response, IQueryable<T> filteredQueryable, IEnumerable<GridColumn> columnModel, string fileName)
        {
            var grid = new DataGrid
            {
                AutoGenerateColumns = false,
                ID = "_exportGrid"
            };
            foreach (var column in columnModel)
            {
                if (column.Hidden) continue;
                var column2 = new BoundColumn
                {
                    DataField = column.DataField
                };
                var str = string.IsNullOrEmpty(column.HeaderText) ? column.DataField : column.HeaderText;
                column2.HeaderText = str;
                column2.DataFormatString = column.DataFormatString;
                //column2.FooterText = column.FooterValue;
                grid.Columns.Add(column2);
            }
            var dt = filteredQueryable.ToDataTable<T>(columnModel);
            grid.DataSource = dt;
            grid.DataBind();
            var writer = new StringWriter();
            var writer2 = new HtmlTextWriter(writer);
            grid.RenderControl(writer2);
            response.ContentEncoding = System.Text.Encoding.GetEncoding("Windows-1252");
            response.Charset = "Windows-1252";
            response.ClearContent();
            response.AddHeader("content-disposition", "attachment; filename=" + fileName + ".xls");
            response.ContentType = "application/excel";
            response.Clear();
            response.Write(writer.ToString());
            response.Flush();
            response.SuppressContent = true;
        }

    }
}
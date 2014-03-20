using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI.WebControls;


namespace QGrid.Export
{
    public class CsvExporter<T> : IFileExporter<T>
    {
        GridExportSettings ExportSettings = new GridExportSettings();
        public ExportType ExportType { get; set; }
        public CsvExporter()
        {
            ExportType = ExportType.CSV;
        }
        public void ExportToHttpResponse(HttpResponse response, IQueryable<T> filteredQueryable, IEnumerable<GridColumn> columnModel, string fileName)
        {
            var listOfColumns = columnModel.ToList();
            var grid = new DataGrid
            {
                AutoGenerateColumns = false,
                ID = "_exportGrid"
            };
            foreach (var column in listOfColumns)
            {
                if (!column.Hidden)
                {
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
            }
            grid.DataSource = filteredQueryable.ToDataTable<T>(listOfColumns);
            grid.DataBind();



            var builder = new StringBuilder();
            if (this.ExportSettings.ExportHeaders)
            {
                foreach (BoundColumn column in grid.Columns)
                {
                    builder.AppendFormat("{0}{1}", this.QuoteText(column.HeaderText), this.ExportSettings.CSVSeparator);
                }
            }
            builder.Append("\n");
            foreach (DataGridItem item in grid.Items)
            {
                for (var i = 0; i < listOfColumns.Count; i++)
                {
                    if (listOfColumns[i].Visible)
                    {
                        if (i < item.Cells.Count)
                        {
                            builder.AppendFormat("{0}{1}", this.QuoteText(item.Cells[i].Text),
                                                 this.ExportSettings.CSVSeparator);
                        }
                    }
                }
                builder.Append("\n");
            }
            response.ClearContent();
            response.AddHeader("content-disposition", "attachment; filename=" + fileName + ".csv");
            response.ContentType = "application/excel";
            response.ContentEncoding = Encoding.Default;
            response.Clear();
            response.Write(builder.ToString());
            response.Flush();
            response.SuppressContent = true;
        }
        private string QuoteText(string input)
        {
            return string.Format("\"{0}\"", input.Replace("\"", "\"\""));
        }


    }
}
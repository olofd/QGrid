using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace QGrid.Export
{
    public class PdfExporter<T> : IFileExporter<T>
    {
        public ExportType ExportType { get; set; }
        public PdfExporter()
        {
            ExportType = ExportType.PDF;
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
            grid.DataSource = filteredQueryable.ToList();
            grid.DataBind();


            var dt = new DataTable();
            foreach (DataGridColumn column in grid.Columns)
            {
                dt.Columns.Add(column.HeaderText);
            }
            foreach (DataGridItem item in grid.Items)
            {
                var row = dt.NewRow();
                for (var i = 0; i < grid.Columns.Count; i++)
                {
                    row[i] = item.Cells[i].Text;

                }
                dt.Rows.Add(row);
            }

            var pdfDoc = new Document();
            var pdfStream = new MemoryStream();
            var pdfWriter = PdfWriter.GetInstance(pdfDoc, pdfStream);

            pdfDoc.Open(); //Open Document to write
            pdfDoc.NewPage();

            var font8 = FontFactory.GetFont("ARIAL", 7);

            var pdfTable = new PdfPTable(dt.Columns.Count);
            PdfPCell pdfPCell = null;

            //Add Header of the pdf table
            for (var column = 0; column < dt.Columns.Count; column++)
            {
                pdfPCell = new PdfPCell(new Phrase(new Chunk(dt.Columns[column].Caption, font8)));
                pdfTable.AddCell(pdfPCell);
            }

            //How add the data from datatable to pdf table
            for (var rows = 0; rows < dt.Rows.Count; rows++)
            {
                for (var column = 0; column < dt.Columns.Count; column++)
                {
                    var columnString = dt.Rows[rows][column].ToString();
                    if (columnString == "&nbsp;")
                    {
                        columnString = "-";
                    }
                    pdfPCell = new PdfPCell(new Phrase(new Chunk(columnString, font8)));
                    pdfTable.AddCell(pdfPCell);
                }
            }

            pdfTable.SpacingBefore = 15f; // Give some space after the text or it may overlap the table            
            pdfDoc.Add(pdfTable); // add pdf table to the document
            pdfDoc.Close();
            pdfWriter.Close();
            response.ClearContent();
            response.ClearHeaders();
            response.ContentType = "application/pdf";
            response.AppendHeader("Content-Disposition", "attachment; filename=" + fileName + ".pdf");
            response.BinaryWrite(pdfStream.ToArray());
            response.End();



        }


    }
}
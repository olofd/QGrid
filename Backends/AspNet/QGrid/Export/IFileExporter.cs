using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QGrid.Export
{
    public interface IFileExporter<in T>
    {
        ExportType ExportType { get; set; }

        void ExportToHttpResponse(HttpResponse response, IQueryable<T> filteredQueryable, IEnumerable<GridColumn> columnModel,
            string fileName);

    }
}

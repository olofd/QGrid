using System;
using System.Collections.Generic;
using System.Linq;

namespace QGrid
{
    public static class GridCacheController
    {
        private static List<GridModel> GridCache = new List<GridModel>();

        public static GridModel GetGridModelForGridId(string gridId)
        {
            return GridCache.FirstOrDefault(b => b.GridId == gridId);

        }
        public static GridModel GetOrAddGridModel(string gridId,Type gridType)
        {
            GridModel grid = GetGridModelForGridId(gridId);
            if (grid != null) return grid;
            grid = new GridModel(gridType, gridId);
            GridCache.Add(grid);
            return grid;
        }
    }
    public class GridModel
    {
        private readonly string _gridId;
        public string GridId { get { return _gridId; } }
        public List<GridColumn> Columns { get; set; }

        public GridModel(Type type, string gridId)
        {
            Columns = new List<GridColumn>();
            _gridId = gridId;
            var allProperties = type.GetProperties().ToList();
            var primaryKey = allProperties.FirstOrDefault(p => p.IsDefined(typeof(QGridPrimaryKey), false));
            foreach (var property in allProperties)
            {
                var dataType = property.PropertyType;
                var qgridDataFormatString = property.GetCustomAttributes(typeof(QGridDataFormatString), false);
                var dataFormatString = "";
                if (qgridDataFormatString.Any())
                {
                    dataFormatString = qgridDataFormatString.Cast<QGridDataFormatString>().Single().DataFormat;
                }


                SearchOpearator searchOpearatorEnum;
                var searchOperation = property.GetCustomAttributes(typeof(QGridSearchToolBarOperation), false);
                if (searchOperation.Any())
                {
                    searchOpearatorEnum = searchOperation.Cast<QGridSearchToolBarOperation>().Single().SearchOpearator;
                }
                else
                {
                    searchOpearatorEnum = dataType == typeof(DateTime) ? SearchOpearator.IsGreaterOrEqualTo : dataType == typeof(int) ? SearchOpearator.IsEqualTo : SearchOpearator.BeginsWith;
                }


                bool hidden = false;
                var hiddenColumn = property.GetCustomAttributes(typeof(QGridHiddenColumn), false);
                if (hiddenColumn.Any())
                {
                    hidden = true;
                }


                Columns.Add(new GridColumn
                {
                    DataType = dataType,
                    DataField = property.Name,
                    DataFormatString = dataFormatString,
                    SearchToolBarOpearator = searchOpearatorEnum,
                    Hidden = hidden
                });
            }



        }
    }
}
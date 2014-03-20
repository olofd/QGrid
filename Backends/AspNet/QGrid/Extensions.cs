using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace QGrid
{
    internal static class Extensions
    {
        private static DataTable ObtainDataTableFromIEnumerable<T>(IEnumerable ien, IEnumerable<GridColumn> columns)
        {
            var table = new DataTable();
            foreach (var obj2 in ien)
            {
                if (obj2 is DbDataRecord)
                {
                    var record = obj2 as DbDataRecord;
                    if (table.Columns.Count == 0)
                    {
                        foreach (var column in columns.Where(column => !column.Hidden))
                        {
                            table.Columns.Add(column.DataField);
                        }
                    }
                    var row = table.NewRow();
                    foreach (var column2 in columns.Where(column2 => !column2.Hidden))
                    {
                        row[column2.DataField] = record[column2.DataField];
                    }
                    table.Rows.Add(row);
                }
                else if (obj2 is DataRow)
                {
                    var row2 = obj2 as DataRow;
                    if (table.Columns.Count == 0)
                    {
                        foreach (var column3 in columns.Where(column3 => !column3.Hidden))
                        {
                            table.Columns.Add(column3.DataField);
                        }
                    }
                    var row3 = table.NewRow();
                    foreach (var column4 in columns.Where(column4 => !column4.Hidden))
                    {
                        row3[column4.DataField] = row2[column4.DataField];
                    }
                    table.Rows.Add(row3);
                }
                else
                {
                    var properties = obj2.GetType().GetProperties().Where(b => !b.GetCustomAttributes(typeof(QGridHiddenColumn), false).Any()).ToArray();
                    if (table.Columns.Count == 0)
                    {
                        foreach (var info in properties)
                        {
                            var propertyType = info.PropertyType;
                            if (propertyType.IsGenericType && (propertyType.GetGenericTypeDefinition() == typeof(Nullable<>)))
                            {
                                propertyType = Nullable.GetUnderlyingType(propertyType);
                            }
                            table.Columns.Add(info.Name, propertyType);
                        }
                    }
                    var row4 = table.NewRow();
                    foreach (var info2 in properties)
                    {
                        var obj3 = info2.GetValue(obj2, null);
                        if (obj3 != null)
                        {
                            row4[info2.Name] = obj3;
                        }
                        else
                        {
                            row4[info2.Name] = DBNull.Value;
                        }
                    }
                    table.Rows.Add(row4);
                }
            }
            return table;
        }


        public static DataTable ToDataTable<T>(this IEnumerable en, IEnumerable<GridColumn> columns)
        {
            var table = new DataTable();
            var view = en as DataView;

            if (view != null)
            {
                return view.ToTable();
            }
            if (en != null)
            {
                table = ObtainDataTableFromIEnumerable<T>(en, columns);
            }
            return table;
        }


    }
}


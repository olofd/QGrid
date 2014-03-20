using System;

namespace QGrid
{
    [AttributeUsage(AttributeTargets.Property)]
    public class QGridHiddenColumn : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class QGridPrimaryKey : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class QGridDataFormatString : Attribute
    {
        public string DataFormat { get; set; }
        public QGridDataFormatString(string dataFormat)
        {
            DataFormat = dataFormat;
        }
    }

    [AttributeUsage(AttributeTargets.Property)]
    public class QGridSearchToolBarOperation : Attribute
    {
        public SearchOpearator SearchOpearator { get; set; }
        public QGridSearchToolBarOperation(SearchOpearator searchOpearator)
        {
            SearchOpearator = searchOpearator;
        }
    }
}
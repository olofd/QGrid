using System;
using System.Collections.Generic;


namespace QGrid
{
    public class GridColumn
    {
        public GridColumn()
        {
            this.SearchToolBarOpearator = SearchOpearator.BeginsWith;
            this.DataField = "";
            this.DataFormatString = "";
            this.HeaderText = "";
            this.Visible = true;

        }


        public bool Hidden { get; set; }

        public string DataField { get; set; }

        public string DataFormatString { get; set; }

        public Type DataType { get; set; }


        public string HeaderText { get; set; }

        public SearchOpearator SearchToolBarOpearator { get; set; }

        public bool Visible { get; set; }

    }
}


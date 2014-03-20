namespace QGrid
{
    public class GridExportSettings
    {
        public GridExportSettings()
        {
            this.ExportUrl = "";
            this.CSVSeparator = ",";
            this.ExportHeaders = true;
            this.ExportDataRange = ExportDataRange.All;
        }

        public string CSVSeparator { get; set; }

        public ExportDataRange ExportDataRange { get; set; }

        public bool ExportHeaders { get; set; }

        public string ExportUrl { get; set; }
    }
}


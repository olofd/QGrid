using System.Collections.Generic;

namespace QGrid
{


    public class JsonResponse<T>
    {
        public JsonResponse(int currentPage, int totalPagesCount, int totalRowCount, int pageSize, int actualRows, List<T> rows)
        {
            this.page = currentPage;
            this.total = totalPagesCount;
            this.records = totalRowCount;
            this.rows = rows;
        }

        public int page { get; set; }

        public int records { get; set; }


        public int total { get; set; }

        public List<T> rows { get; set; }
    }
}


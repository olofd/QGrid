using System.Collections.Generic;

namespace QGrid
{
    internal class MultiFilter
    {
        public string groupOp { get; set; }

        public List<SearchRule> rules { get; set; }
    }
}


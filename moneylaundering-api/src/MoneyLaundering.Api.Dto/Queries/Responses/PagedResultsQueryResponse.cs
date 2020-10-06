using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class PagedResultsQueryResponse<T>
    {
        public int ActualPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public IEnumerable<T> Results { get; set; }
    }
}

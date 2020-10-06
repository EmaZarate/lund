using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class PaginationQuery
    {
        public int ItemsPerPage { get; set; }
        public int ActualPage { get; set; }
        public string OrderBy { get; set; }
        public bool Ascending { get; set; }
    }
}

﻿namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class GrayListQueryResponse
    {
        public int Id { get; set; }
        public string Comments { get; set; }
        public bool Active { get; set; }
        public int PersonId { get; set; }
        public int? PersonOriginalId { get; set; }
    }
}

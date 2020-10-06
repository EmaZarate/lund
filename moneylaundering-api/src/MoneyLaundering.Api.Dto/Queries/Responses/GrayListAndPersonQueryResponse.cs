using System;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class GrayListAndPersonQueryResponse
    {
        public int Id { get; set; }
        public string Comments { get; set; }
        public bool Active { get; set; }
        public DateTime CreationDate { get; set; }
        public int PersonId { get; set; }
        public PersonSimpleQueryResponse Person { get; set; }
    }
}

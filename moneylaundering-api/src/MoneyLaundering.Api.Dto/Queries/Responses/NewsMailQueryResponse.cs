using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class NewsMailQueryResponse
    {
        public int CaseId { get; set; }
        public int NewsId { get; set; }
        public int BusinessUnitId { get; set; }
        public string ContactMail { get; set; }
        public int MailTypeId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

}

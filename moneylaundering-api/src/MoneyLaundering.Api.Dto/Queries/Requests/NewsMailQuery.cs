using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class NewsMailQuery : IRequest<NewsMailQueryResponse>
    {
		public int NewsId { get; set; }
		public string ContactMail { get; set; }
		public int MailTypeId { get; set; }
		public string Subject { get; set; }
		public string Message { get; set; }
	}
}

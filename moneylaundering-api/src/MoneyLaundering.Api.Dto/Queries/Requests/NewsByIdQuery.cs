using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class NewsByIdQuery : IRequest<NewsQueryResponse>
    {
        public NewsByIdQuery(int id)
        {
            this.id = id;
        }

        public int id { get; set; }
    }
}

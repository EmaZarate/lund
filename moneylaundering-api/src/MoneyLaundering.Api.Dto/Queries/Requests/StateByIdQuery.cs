using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class StateByIdQuery : IRequest<StateQueryResponse>
    {
        public StateByIdQuery(int id)
        {
            this.id = id;
        }
        public int id { get; set; }
	}
}

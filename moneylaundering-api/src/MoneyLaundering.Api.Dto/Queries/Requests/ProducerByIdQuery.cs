using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class ProducerByIdQuery : IRequest<ProducerQueryResponse>
    {
        public ProducerByIdQuery(int id)
        {
            this.Id = id;
        }
        public int Id { get; set; }
    }
}

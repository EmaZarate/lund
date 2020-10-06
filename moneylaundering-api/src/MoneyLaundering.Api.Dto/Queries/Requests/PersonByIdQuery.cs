using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class PersonByIdQuery : IRequest<PersonQueryResponse>
    {
        public PersonByIdQuery(int id)
        {
            this.id = id;
        }

        public int id { get; set; }
    }
}

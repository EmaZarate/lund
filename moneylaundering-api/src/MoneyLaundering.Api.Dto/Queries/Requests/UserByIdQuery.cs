using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class UserByIdQuery : IRequest<UserQueryResponse>
    {
        public UserByIdQuery(int id)
        {
            this.Id = id;
        }

        public int Id { get; set; }
    }
}

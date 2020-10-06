using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class UserQuery : IRequest<IEnumerable<UserQueryResponse>>
    {
        public string RoleId { get; set; }

        public UserQuery(string RoleId)
        {
            this.RoleId = RoleId;
        }
    }
}


using AutoMapper;
using Identity.Api.Sdk.Lib;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.User.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<UserQuery, IEnumerable<UserQueryResponse>>
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly IUserSession userSession;

        public GetAllCommandHandler(IUserSession userSession ,IUserRepository userRepository, IMapper mapper)
        {
            this.userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.userSession = userSession ?? throw new ArgumentNullException(nameof(userSession));

        }

        public async Task<IEnumerable<UserQueryResponse>> Handle(UserQuery request, CancellationToken cancellationToken)
        {
            //var result = await this.userRepository.GetByRoleId(userSession.Roles.ToList()[0],userSession.ApplicationId);
            var result = await this.userRepository.GetByRoleId(request.RoleId, 5);

            if (result == null)
                throw new NoActionException(Crosscutting.Globalization.Message.StatesNotFound);

            var mapped = mapper.Map<IEnumerable<UserQueryResponse>>(result);

            return mapped.OrderBy(x => x.FirstName);
        }
    }
}

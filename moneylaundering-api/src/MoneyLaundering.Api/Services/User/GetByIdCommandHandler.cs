using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.User.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<UserByIdQuery, UserQueryResponse>
    {
        private readonly IRepository<Domain.Entities.User> userRepository;

        public GetByIdCommandHandler(IRepository<Domain.Entities.User> userRepository)
        {
            this.userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<UserQueryResponse> Handle(UserByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await this.userRepository.GetAsync<UserQueryResponse>(request.Id);
 
            if(result == null) 
                throw new NoActionException(Crosscutting.Globalization.Message.StatesNotFound);
  
            return result;
        }
    }
}

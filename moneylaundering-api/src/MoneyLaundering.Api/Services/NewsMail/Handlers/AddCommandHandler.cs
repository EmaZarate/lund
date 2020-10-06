using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.NewsMail.Handlers
{
    public class AddCommandHandler : IRequestHandler<NewsMailCommand, bool>
    {
        private readonly INewsMailRepository _newsMailRepository;

        public AddCommandHandler(INewsMailRepository newsMailRepository)
        {
            this._newsMailRepository = newsMailRepository ?? throw new ArgumentNullException(nameof(newsMailRepository));
        }
        public async Task<bool> Handle(NewsMailCommand request, CancellationToken cancellationToken)
        {
            var updated = await this._newsMailRepository.Add(request);
            if (!updated)
                throw new NoActionException(Crosscutting.Globalization.Message.CantUpdateNewsMail);
            return true;
        }

    }
}

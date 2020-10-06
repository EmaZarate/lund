using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.NewsDocument.Handlers
{
    public class AddCommandHandler : IRequestHandler<NewsDocumentCommand, bool>
    {
        private readonly INewsDocumentRepository _newsDocumentRepository;

        public AddCommandHandler(INewsDocumentRepository newsDocumentRepository)
        {
            this._newsDocumentRepository = newsDocumentRepository ?? throw new ArgumentNullException(nameof(newsDocumentRepository));
        }
        public async Task<bool> Handle(NewsDocumentCommand request, CancellationToken cancellationToken)
        {
            var updated = await this._newsDocumentRepository.Add(request);
            if (!updated)
                throw new NoActionException(Crosscutting.Globalization.Message.CantUpdateNewsDocument);
            return true;
        }

    }
}

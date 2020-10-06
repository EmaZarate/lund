using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Person.Handlers
{
    public class AlertRecoveryUpdateCommandHandler : IRequestHandler<AlertRecoveryCommand, bool>
    {
        private readonly IAlertRecoveryRepository alertRecoveryRepository;

        public AlertRecoveryUpdateCommandHandler(IAlertRecoveryRepository alertRecoveryRepository)
        {
            this.alertRecoveryRepository = alertRecoveryRepository ?? throw new ArgumentNullException(nameof(alertRecoveryRepository));
        }
        public async Task<bool> Handle(AlertRecoveryCommand request, CancellationToken cancellationToken)
        {
            var runSuccess = await this.alertRecoveryRepository.AlertRecoveryUpdate(request);

            if (!runSuccess)
                throw new NoActionException(Crosscutting.Globalization.Message.CantAlertRecovery);
            return true;
        }

    }
}

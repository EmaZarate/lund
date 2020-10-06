using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class AlertRecoveryCommand : IRequest<bool>
    {
        public string param { get; set; }
    }
}

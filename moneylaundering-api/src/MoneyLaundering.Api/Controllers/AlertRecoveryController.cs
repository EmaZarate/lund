using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Commands.Request;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertRecoveryController : BaseController
    {

        public AlertRecoveryController(IMediator mediator) : base(mediator)
        {

        }

        [HttpPost]
        [Route("AlertRecoveryUpdate")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] AlertRecoveryCommand command)
            => Ok(await mediator.Send(command));

    }
}

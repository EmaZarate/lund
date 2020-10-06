using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Controllers.Base
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public abstract class BaseController : ControllerBase
    {
        protected readonly IMediator mediator;

        protected BaseController(IMediator mediator)
        {
            Argument.ThrowIfNull(mediator, nameof(mediator));

            this.mediator = mediator;
        }
    }
}

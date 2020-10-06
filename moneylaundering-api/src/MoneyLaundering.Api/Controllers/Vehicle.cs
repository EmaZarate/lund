using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : BaseController
    {

        public VehicleController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{caseId}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(VehicleQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int caseId)
            => Ok(await mediator.Send(new VehicleQuery(caseId)));

    }
}

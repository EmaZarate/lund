using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : BaseController
    {


        public StateController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(StateQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new StateByIdQuery(id)));


        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<StateQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] StateQuery query)
            => Ok(await mediator.Send(query));

    }
}

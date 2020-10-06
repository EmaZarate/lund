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
using MoneyLaundering.Api.Crosscutting.Identifiers;
using Identity.Api.Sdk.Lib;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : BaseController
    {
        public CaseController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(CaseQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] CaseByIdQuery query)
            => Ok(await mediator.Send(query));

        [HttpGet]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [Route("getByFilter")]
        [ProducesResponseType(typeof(IEnumerable<CaseQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] CaseQuery query)
            => Ok(await mediator.Send(query));

        [HttpPost]
        [Authorize(Roles = Roles.Analyst)]
        [Route("analystAssignment")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] AnalystAssignmentCommand command)
            => Ok(await mediator.Send(command));

        [HttpPost]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [Route("analystReAssignment")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] AnalystReAssignmentCommand command)
            => Ok(await mediator.Send(command));

        [HttpGet]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [Route("getByNewsId")]
        [ProducesResponseType(typeof(IEnumerable<CaseQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] CaseByNewsIdQuery query)
            => Ok(await mediator.Send(query));
    }
}
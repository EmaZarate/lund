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

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrayListController : BaseController
    {


        public GrayListController(IMediator mediator) : base(mediator)
        {

        }


        //[HttpGet("length")]
        //[AllowAnonymous]
        //[ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> Get([FromQuery] GrayListLengthQuery length)
        //    => Ok(await mediator.Send(length));

        [HttpGet]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(IEnumerable<GrayListAndPersonQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] GrayListQuery query)
            => Ok(await mediator.Send(query));

        [HttpGet("{id}")]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(GrayListAndPersonQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new GrayListByIdQuery(id)));

        [HttpPost]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] GrayListCommand command)
            => Ok(await mediator.Send(command));

        [HttpPut]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromBody] GrayListUpdateCommand command)
            => Ok(await mediator.Send(command));

        [HttpPut("deactivate")]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromBody] GrayListDeactivateCommand command)
            => Ok(await mediator.Send(command));
    }
}

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
    public class PersonController : BaseController
    {

        public PersonController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("length")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] PersonLengthQuery length)
           => Ok(await mediator.Send(length));

        [HttpGet("{id}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(PersonQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new PersonByIdQuery(id)));

        [HttpGet("getByFilter")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(PagedResultsQueryResponse<PersonQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> getByFilter([FromQuery] PersonQuery query)
            => Ok(await mediator.Send(query));        

        [HttpGet("getByGroupCode")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(PersonQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> getByGroupCode(int id)
            => Ok(await mediator.Send(new PersonByIdQuery(id)));

        [HttpPost]
        [Route("BusinessUnitUpdate")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] PersonBusinessUnitCommand command)
            => Ok(await mediator.Send(command));

    }
}

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProducerController : BaseController
    {
        public ProducerController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<ProducerQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] ProducerQuery query)
            => Ok(await mediator.Send(query));

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ProducerQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetByID(int id)
            => Ok(await mediator.Send(new ProducerByIdQuery(id)));
    }
}
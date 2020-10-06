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
    public class NewsDocumentController : BaseController
    {

        public NewsDocumentController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("getByNewsId")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<NewsDocumentQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> getByNewsId([FromQuery] NewsDocumentQuery query)
            => Ok(await mediator.Send(query));

        [HttpPost]
        [Route("add")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] NewsDocumentCommand command)
            => Ok(await mediator.Send(command));

    }
}

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
    public class CaseGroupController: BaseController
    {
        public CaseGroupController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<CaseGroupQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] CaseGroupQuery query)
            => Ok(await mediator.Send(query));
    }
}

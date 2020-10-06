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
    public class NewsReasonController : BaseController
    {


        public NewsReasonController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<NewsReasonQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new NewsReasonQuery(id)));

    }
}

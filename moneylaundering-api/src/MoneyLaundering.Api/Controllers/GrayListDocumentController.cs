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
    public class GrayListDocumentController : BaseController
    {


        public GrayListDocumentController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{id}")]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(IEnumerable<GrayListDocumentQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new GrayListDocumentByIdQuery(id)));
    }
}

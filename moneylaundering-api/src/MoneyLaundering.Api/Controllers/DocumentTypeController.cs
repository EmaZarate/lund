using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Net;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentTypeController : BaseController
    {
        public DocumentTypeController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(DocumentTypeQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] DocumentTypeQuery query)
            => Ok(await mediator.Send(query));
    }
}

using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseDocumentController : BaseController
    {
        public CaseDocumentController(IMediator mediator) : base(mediator)
        {
            
        }
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(CaseDocumentQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] CaseDocumentCommand command)
        => Ok(await mediator.Send(command));
    }
}
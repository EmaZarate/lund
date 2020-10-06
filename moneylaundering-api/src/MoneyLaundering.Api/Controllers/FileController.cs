using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Crosscutting.Identifiers;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Net;
using System.Threading.Tasks;


namespace MoneyLaundering.Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class FileController: BaseController
    {
        public FileController(IMediator mediator) : base(mediator)
        {

        }

        [HttpPost]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromForm] UploadFileCommand command)
        => Ok(await mediator.Send(command));

        [HttpDelete("{fileName}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(string fileName)
        => Ok(await mediator.Send(new DeleteFileCommand(fileName)));

        [HttpGet("{fileName}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(BarcodesByFileResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(string fileName)
        => Ok(await mediator.Send(new BarcodesByFileQuery(fileName)));

    }
}

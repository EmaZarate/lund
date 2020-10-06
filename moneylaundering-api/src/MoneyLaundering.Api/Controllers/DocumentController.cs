using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Crosscutting.Identifiers;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System.Net;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : BaseController
    {
        private IDocumentRepository _documentRepository;
        public DocumentController(IMediator mediator, IDocumentRepository documentRepository) : base(mediator)
        {
            _documentRepository = documentRepository;
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id)
           => Ok(await mediator.Send(new DocumentIdQuery(id)));

        [HttpGet("{id}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(DocumentQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new DocumentByIdQuery(id)));

        [HttpGet("byPersonIdWithoutCase/{id}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(DocumentQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetDocumentByPersonIdWithoutCase(int id)
            => Ok(await mediator.Send(new DocumentByPersonIdWithoutCaseQuery(id)));

        [HttpPost]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(DocumentQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromForm] UploadDocumentCommand command)
        => Ok(await mediator.Send(command));

        [HttpPut]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(DocumentQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Put([FromForm] NewVersionDocumentCommand command)
        => Ok(await mediator.Send(command));
    }
}

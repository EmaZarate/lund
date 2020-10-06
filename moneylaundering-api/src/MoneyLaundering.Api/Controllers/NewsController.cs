using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Net;
using System.Threading.Tasks;
using MoneyLaundering.Api.Crosscutting.Identifiers;
using Identity.Api.Sdk.Lib;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : BaseController
    {
        public NewsController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{id}")]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(NewsQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(int id)
            => Ok(await mediator.Send(new NewsByIdQuery(id)));

        [HttpPost]
        [Authorize(Roles = ExtendedRoles.AllRoles)]
        [ProducesResponseType(typeof(NewsQueryResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] NewsQuery query)
            => Ok(await mediator.Send(query));

        [HttpPost]
        [Route("infoReception")]
        [Authorize(Roles = Roles.Analyst)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] RequestInformationCaseCommand command)
            => Ok(await mediator.Send(command));


        [HttpPost]
        [Route("caseUnderestimating")]
        [Authorize(Roles = ExtendedRoles.AnalystAndHigher)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] CaseUnderestimatingCommand command)
            => Ok(await mediator.Send(command));

        [HttpPost]
        [Route("caseEnding")]
        [Authorize(Roles = Roles.ComplianceOfficer)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] CaseEndingCommand command)
            => Ok(await mediator.Send(command));

        [HttpPost]
        [Route("caseDerivation")]
        [Authorize(Roles = Roles.Analyst)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] CaseDerivationCommand command)
            => Ok(await mediator.Send(command));

        [HttpPost]
        [Route("analystDevolution")]
        [Authorize(Roles = ExtendedRoles.HigherAndCO)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] AnalystDevolutionCommand command)
            => Ok(await mediator.Send(command));


        [HttpPost]
        [Route("changeExpiration")]
        [Authorize(Roles = Roles.Analyst)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] ChangeExpirationCommand command)
            => Ok(await mediator.Send(command));


        [HttpPost]
        [Route("fakePossitive")]
        [Authorize(Roles = Roles.Analyst)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] FakePossitiveCommand command)
           => Ok(await mediator.Send(command));

        [HttpPost]
        [Route("infoRequirementCommand")]
        [Authorize(Roles = Roles.Analyst)]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post([FromBody] InfoRequirementCommand command)
            => Ok(await mediator.Send(command));
    }
}
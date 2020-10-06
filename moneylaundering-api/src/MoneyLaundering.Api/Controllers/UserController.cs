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
    public class UserController : BaseController
    {
        public UserController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<UserQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(string id) 
            => Ok(await mediator.Send(new UserQuery(id)));

    }
}

﻿using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoneyLaundering.Api.Controllers.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailTypeController : BaseController
    {

        public MailTypeController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<MailTypeQueryResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get([FromQuery] MailTypeQuery query)
            => Ok(await mediator.Send(query));
    }
}
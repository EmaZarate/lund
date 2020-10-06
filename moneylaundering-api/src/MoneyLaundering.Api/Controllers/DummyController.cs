using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Infrastructure;
using MoneyLaundering.Api.Services;

namespace MoneyLaundering.Api.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class DummyController : ControllerBase
    {
        private readonly IDummyService dummyService;

        public DummyController(IDummyService dummyService)
        {
            Argument.ThrowIfNull(dummyService, nameof(dummyService));

            this.dummyService = dummyService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDummyAsync()
        {
            return Ok(await this.dummyService.GetDummyAsync());
        }

        [HttpGet]
        [Route("exception")]
        public void Exception()
        {
            throw new ValidationException("This is a dummy exception.");
        }
    }
}
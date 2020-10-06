using System.Reflection;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;

using MoneyLaundering.Api.Dto;
using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Services
{
    public class DummyService : IDummyService
    {
        private readonly IWebHostEnvironment environment;

        public DummyService(IWebHostEnvironment environment)
        {
            Argument.ThrowIfNull(environment, nameof(environment));

            this.environment = environment;
        }

        public Task<DummyResponse> GetDummyAsync()
        {
            var entryAssembly = Assembly.GetEntryAssembly();

            var response = new DummyResponse()
            {
                ApiName = entryAssembly.GetName().Name,
                Environment = this.environment.EnvironmentName,
                Version = entryAssembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion,
            };

            return Task.FromResult(response);
        }
    }
}

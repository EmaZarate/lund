using System.Threading.Tasks;

using MoneyLaundering.Api.Dto;

namespace MoneyLaundering.Api.Services
{
    public interface IDummyService
    {
        Task<DummyResponse> GetDummyAsync();
    }
}

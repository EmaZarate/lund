using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface ILocationRepository
    {
        Task<IEnumerable<LocationQueryResponse>> GetLocationByStateId(int id);
        Task<LocationQueryResponse> GetLocationById(int id);
    }
}

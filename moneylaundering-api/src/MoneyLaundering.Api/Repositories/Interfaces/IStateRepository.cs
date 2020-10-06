using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IStateRepository
    {
        Task<IEnumerable<StateQueryResponse>> GetAll();
        Task<StateQueryResponse> GetById(int id);
    }
}

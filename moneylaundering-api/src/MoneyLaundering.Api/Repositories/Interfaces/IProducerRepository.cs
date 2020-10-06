using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IProducerRepository : IRepository<Producer>
    {
        Task<IEnumerable<Producer>> GetAll(ProducerQuery request);
    }
}

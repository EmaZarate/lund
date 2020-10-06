using MoneyLaundering.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IBusinessUnitRepository
    {
        Task<IEnumerable<BusinessUnit>> GetAll();
    }
}

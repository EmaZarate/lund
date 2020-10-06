using MoneyLaundering.Api.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IStatusRepository
    {
        Task<IEnumerable<Status>> GetAll();
        Task<Status> GetStatusById(int id);
    }
}

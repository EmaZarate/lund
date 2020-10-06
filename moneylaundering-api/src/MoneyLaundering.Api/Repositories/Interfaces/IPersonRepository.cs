using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IPersonRepository : IRepository<Person>
    {
        Task<Person> GetById(int id);
        Task<IEnumerable<Person>> GetAll(PersonQuery request);
        Task<bool> BusinessUnitUpdate(PersonBusinessUnitCommand entity);
        Task<IEnumerable<Person>> GetByGroupCode(int id);
    }
}
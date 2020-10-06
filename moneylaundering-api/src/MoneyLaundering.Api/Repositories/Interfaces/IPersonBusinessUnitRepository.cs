using MoneyLaundering.Api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IPersonBusinessUnitRepository : IRepository<PersonBusinessUnit>
    {
        Task<List<PersonBusinessUnit>> GetByPeopleIds(int?[] peopleIds);
    }
}

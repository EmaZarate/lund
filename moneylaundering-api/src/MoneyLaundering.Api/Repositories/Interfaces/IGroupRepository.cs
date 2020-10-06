using MoneyLaundering.Api.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        Task<bool> SaveGroup(List<Person> peopleToSave, List<Case> casesToSave, List<Document> documentToSave, List<GrayList> grayListToSave, List<PersonBusinessUnit> personBusinessUnitAdded);
    }
}

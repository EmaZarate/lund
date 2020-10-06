using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface ICaseRepository: IRepository<Case>
    {
        Task<Case> GetById(int id, int businessUnitId);
        Task<IEnumerable<Case>> GetAll(CaseQuery request);
        Task<IEnumerable<Case>> GetCaseByDocumentID(int request);
        Task<bool> UpdateCase(Case entity);

        Task<bool> SaveAsync();
        Task<List<Case>> GetByPeopleIds(int?[] peopleIds);
        void UpdateRangeOriginalPersonIdAndPersonID(List<Case> cases);
        int GetLastNewsId(int caseID);
        Task<Case> GetByNewsId(string request);
    }
}

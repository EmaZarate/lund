using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IGrayListRepository : IRepository<GrayList>
    {
        Task<List<GrayList>> GetByPeopleIds(int?[] peopleIds);
        Task<IEnumerable<GrayList>> GetAll(GrayListQuery request);
        Task<GrayList> AddNew(GrayListCommand command);
        Task<GrayList> GetById(int PersonId);
        Task<GrayList> GetByGrayListId(int GrayListId);
        Task AddDocument(int GrayListId, List<int> DocumentId);
        Task<IEnumerable<GrayListDocument>> GetDocumentById(int GrayListId);
        Task<bool> SaveAsync();
        Task<bool> DeleteAsync(GrayList GrayList);
    }
}

using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface INewsRepository
    {
        Task<News> GetNewByCase(int actualStageId, int businessUnitId, int caseID);
        Task<IEnumerable<NewsQueryResponse>> GetNewByCaseAndBussinessUnit(int caseId, int businessUnitId);
        Task<News> GetNewsById(int? id);
        void Add(News News);
        Task<bool> UpdateNews(News entity);
        Task<bool> CreateNews(News entity);
        Task<bool> Save();
    }
}

using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface INewsDocumentRepository : IRepository<NewsDocument>
    {
        Task<NewsDocument> GetByCaseId(int id);
        Task<NewsDocument> GetByNewsId(int id);
        Task<bool> Add(NewsDocumentCommand entity);
    }
}
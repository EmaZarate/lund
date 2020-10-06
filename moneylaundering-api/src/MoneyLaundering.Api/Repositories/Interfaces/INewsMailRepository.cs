using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface INewsMailRepository : IRepository<NewsMail>
    {
        Task<NewsMail> GetByCaseId(int id);
        Task<NewsMail> GetByNewsId(int id);
        Task<bool> Add(NewsMailCommand entity);
    }
}
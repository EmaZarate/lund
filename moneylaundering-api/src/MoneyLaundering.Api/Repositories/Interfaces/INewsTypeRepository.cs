using MoneyLaundering.Api.Domain.Entities;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface INewsTypeRepository
    {
        Task<NewsType> GetNewsTypeByDescription(string description);
    }
}

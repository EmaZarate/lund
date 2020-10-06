using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MoneyLaundering.Api.Domain;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IFileRepository
    {
        Task<File> ReadAsync(string fileName);
        Task DeleteAsync(string fileName);
        Task<string> AddAsync(IFormFile file,string filePath);
    }
}

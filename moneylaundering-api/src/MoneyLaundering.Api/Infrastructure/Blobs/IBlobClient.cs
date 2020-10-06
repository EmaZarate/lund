using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Infrastructure.Blobs
{
    public interface IBlobClient
    {
        Task<IEnumerable<byte>> DownloadAsync(string container, string filePath);
        Task UploadAsync(string container, string filePath, Stream content);
        Task DeleteAsync(string container, string filePath);
        Task ClearAsync(string container);
        Task<IEnumerable<string>> ListAsync(string container);
    }
}

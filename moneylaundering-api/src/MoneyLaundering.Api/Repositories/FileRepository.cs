using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Sdk.Lib;
using Microsoft.AspNetCore.Http;
using MoneyLaundering.Api.Crosscutting.Constants;
using MoneyLaundering.Api.Domain;
using MoneyLaundering.Api.Infrastructure;
using MoneyLaundering.Api.Infrastructure.Blobs;
using MoneyLaundering.Api.Repositories.Interfaces;



namespace MoneyLaundering.Api.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly IUserSession userSession;
        private readonly IBlobClient blobClient;
        public FileRepository(IUserSession userSession, IBlobClient blobClient)
        {
            Argument.ThrowIfNull(userSession, nameof(userSession));
            Argument.ThrowIfNull(blobClient, nameof(blobClient));

            this.userSession = userSession;
            this.blobClient = blobClient;
        }

        public async Task<File> ReadAsync(string fileName)
        {
            //var filePath = this.GetFilePath(fileName);
            var filePath = fileName;

            var data = await this.blobClient.DownloadAsync(Directories.Documents, filePath);

            return new File(fileName, data.ToArray());
        }

        public async Task DeleteAsync(string fileName)
        {
            //var filePath = this.GetFilePath(fileName);
            var filePath = fileName;
            await this.blobClient.DeleteAsync(Directories.Documents, filePath);
        }

        public async Task<string> AddAsync(IFormFile file, string filePath)
        {
            //var fileName = $"{Guid.NewGuid().ToString()}.pdf";
            //string filePath = this.GetFilePath(fileName);

            var stream = file.OpenReadStream();
            await this.blobClient.UploadAsync(Directories.Documents, filePath, stream);

            return filePath;
        }

        private string GetFilePath(string fileName)
        {
            return $"{this.userSession.CuitCuil}/{fileName}";
        }
    }
}

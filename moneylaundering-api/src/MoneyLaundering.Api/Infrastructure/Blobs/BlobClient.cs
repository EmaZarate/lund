using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Configuration;

namespace MoneyLaundering.Api.Infrastructure.Blobs
{
    public class BlobClient : IBlobClient
    {
        private readonly BlobServiceClient blobServiceClient;
        public BlobClient(IConfiguration configuration)
        {
            Argument.ThrowIfNull(configuration, nameof(configuration));

            var connectionString = configuration.GetKeyVaultConfig("Blob:ConnectionString", "Blob:AccountKey");
            this.blobServiceClient = new BlobServiceClient(connectionString);
        }

        public async Task<IEnumerable<byte>> DownloadAsync(string container, string filePath)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(container);

            BlobDownloadInfo download = await containerClient.GetBlobClient(filePath).DownloadAsync();

            var memStream = new MemoryStream();
            download.Content.CopyTo(memStream);

            return memStream.ToArray();
        }

        public async Task UploadAsync(string container, string filePath, Stream content)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(container);

            await containerClient.CreateIfNotExistsAsync();

            await containerClient.GetBlobClient(filePath).UploadAsync(content);
        }

        public async Task DeleteAsync(string container, string filePath)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(container);

            await containerClient.GetBlobClient(filePath).DeleteAsync();
        }

        public async Task ClearAsync(string container)
        {
            var containerClient = this.blobServiceClient.GetBlobContainerClient(container);

            await containerClient.CreateIfNotExistsAsync();
            var blob = containerClient.GetBlobs();
            foreach (var blobItem in blob)
            {
                await this.DeleteAsync(container, blobItem.Name);
            }
        }

        public async Task<IEnumerable<string>> ListAsync(string container)
        {
            var blobItems = new List<string>();

            var containerClient = this.blobServiceClient.GetBlobContainerClient(container);
            var blob = containerClient.GetBlobs();
            foreach (BlobItem blobItem in blob)
            {
                if (!blobItem.Deleted)
                {
                    blobItems.Add(blobItem.Name);
                }
            }

            return blobItems;
        }
    }
}

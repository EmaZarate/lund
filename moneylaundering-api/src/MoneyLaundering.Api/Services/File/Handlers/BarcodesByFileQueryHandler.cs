using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoneyLaundering.Api.Domain;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Services.File.Handlers
{
    public class BarcodesByFileQueryHandler : IRequestHandler<BarcodesByFileQuery, BarcodesByFileResponse>
    {
        private readonly IFileRepository fileRepository;
        private readonly IBarcodeReaderService barcodeReaderService;

        public BarcodesByFileQueryHandler(IFileRepository fileRepository, IBarcodeReaderService barcodeReaderService)
        {
            this.fileRepository = fileRepository ?? throw new ArgumentNullException(nameof(fileRepository));
            this.barcodeReaderService = barcodeReaderService ?? throw new ArgumentNullException(nameof(barcodeReaderService));
        }
        public async Task<BarcodesByFileResponse> Handle(BarcodesByFileQuery request, CancellationToken cancellationToken)
        {
            var file = await this.fileRepository.ReadAsync(request.Filename);
            var base64 = Convert.ToBase64String(file.Data);
            var barcodesByFileResponse = new BarcodesByFileResponse();
            barcodesByFileResponse.base64 = base64;
            return barcodesByFileResponse;
        }
    }
}

using MediatR;
using Microsoft.AspNetCore.Http;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class UploadFileCommand : IRequest<bool>
    {
        public IFormFile FindingEvidences { get; set; }
        public string OutputFileName { get; set; }
    }
}

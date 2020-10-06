using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class BarcodesByFileQuery : IRequest<BarcodesByFileResponse>
    {
        public string Filename { get; set; }

        public BarcodesByFileQuery(string fileName)
        {
            this.Filename = fileName;
        }
    }
}

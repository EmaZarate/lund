using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class CaseDocumentCommand: IRequest<bool>
    {
        public int CaseId { get; set; }
        public int DocumentId { get; set; }
        public int BusinessUnitId { get; set; }
    }
}

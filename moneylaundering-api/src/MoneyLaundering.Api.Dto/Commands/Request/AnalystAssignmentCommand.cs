using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class AnalystAssignmentCommand: IRequest<bool>
    {
        public AnalystArray[] newItem { get; set; }
    }

    public class AnalystArray
    {
        public int CaseId { get; set; }
        public int BusinessUnitId { get; set; }
        public string AnalystId { get; set; }

    }
}

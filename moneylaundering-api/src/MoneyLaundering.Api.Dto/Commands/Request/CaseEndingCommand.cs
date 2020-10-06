using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class CaseEndingCommand : IRequest<bool>
    {
        public int CaseId { get; set; }
        public int BusinessUnitId { get; set; }
        public string Comments { get; set; }
        public int NewsReasonTypeId { get; set; }
        public bool? UpdateFile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int? ZipCode { get; set; }
        public string ProvinceName { get; set; }
        public string CityName { get; set; }
        public int? StateId { get; set; }
    }
}

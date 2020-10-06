using MediatR;
using System;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class RequestInformationCaseCommand: IRequest<bool>
    {
        public int CaseID { get; set; }
        public int BusinessUnitID { get; set; }
        public String Comments { get; set; }
        public bool? UpdateFile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public int? ZipCode { get; set; }
        public string ProvinceName { get; set; }
        public string CityName { get; set; }
        public int? StateId { get; set; }
    }
}

using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class FakePossitiveCommand: IRequest<bool>
    {
        public int CaseID { get; set; }
        public int BusinessUnitID { get; set; }
        public int StatusId { get; set; }
        public int NewsReasonTypeId { get; set; }
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

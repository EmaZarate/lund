using MediatR;
using System;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class InfoRequirementCommand : IRequest<bool>
    {
        // News //
        public int NewsFlag { get; set; }
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
        public int NewsId { get; set; }

        // NewsMail: NewsFlag = 1  ///
        public string ContactMail { get; set; }
        public int MailTypeId { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }

        // NewsDocument: NewsFlag = 2  ///
        public string ContactAddress { get; set; }
        public int ContactLocationId { get; set; }
        public int ContactZipCode { get; set; }
        public int DocumentLetterTypeId { get; set; }
        public bool Processed { get; set; }

    }
}

using MediatR;
using Microsoft.AspNetCore.Http;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class UploadDocumentCommand : IRequest<DocumentQueryResponse>
    {
        public IFormFile DocumentEvidence { get; set; }
        public string VersionId { get; set; }
        public string LogicName { get; set; }
        public int DocumentTypeId { get; set; }
        public bool Confidential { get; set; }
        public string Comment { get; set; }
        public int PersonId { get; set; }
        public int? PersonOrignalId { get; set; }
        public int? CaseId { get; set; }
        public DateTime? Expiration { get; set; }
        public int BusinessUnit { get; set; }
    }
}

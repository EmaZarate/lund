using MediatR;
using Microsoft.AspNetCore.Http;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class NewVersionDocumentCommand : IRequest<DocumentQueryResponse>
    {
        public IFormFile DocumentEvidence { get; set; }
        public int DocumentId { get; set; }
        public int VersionId { get; set; }
        public int DocumentTypeId { get; set; }
        public string Comment { get; set; }
        public DateTime? Expiration { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IDocumentTypeRepository
    {
        Task<IEnumerable<DocumentTypeQueryResponse>> GetAll();
        Task<DocumentType> Get(int id);
    }
}

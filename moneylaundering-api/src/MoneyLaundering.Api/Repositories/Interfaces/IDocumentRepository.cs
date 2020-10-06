using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories.Interfaces
{
    public interface IDocumentRepository : IRepository<Document>
    {
        Task<bool> DeleteById(int ID);
        Task<Document> GetById(int ID);
        Task<bool> IsDocumentInGrayList(int ID);
        Task<IEnumerable<DocumentQueryResponse>> GetDocumentByPersonId(int id);
        Task<IEnumerable<DocumentQueryResponse>> DeleteByPersonIdWithoutCase(int id);
        Task<IEnumerable<DocumentQueryResponse>> GetAll();
        Task<Document> UploadDocument(Document document);
        Task<List<Document>> GetByPeopleIds(int?[] peopleIds);
    }
}

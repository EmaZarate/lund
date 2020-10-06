using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Repositories
{
    public class DocumentRepository: Repository<Document>, IDocumentRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IDocumentTypeRepository _documentTypeRepository;

        public DocumentRepository(DataContext dbContext, IMapper mapper, IDocumentTypeRepository documentTypeRepository) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this._documentTypeRepository = documentTypeRepository ?? throw new ArgumentNullException(nameof(documentTypeRepository));
        }

        public async Task<bool> DeleteById(int ID)
        {
            var res = await this._dbContext.Document.Where(x => x.Id == ID).FirstOrDefaultAsync();
            if (res != null)
            {
                this._dbContext.Entry(res).State = EntityState.Deleted;
                if (await this._dbContext.SaveChangesAsync() > 0)
                    return true;
            }
            return false;
        }

        public async Task<IEnumerable<DocumentQueryResponse>> DeleteByPersonIdWithoutCase(int id)
        {
            var document = await this._dbContext.Document
                            .Where(x => x.PersonId == id)
                            .Include(d => d.CaseDocuments)
                            .Where(x => x.CaseDocuments.Count == 0)
                            .Include(d => d.DocumentType)
                            .Include(d => d.DocumentVersions)
                            .ToListAsync();
            var mappedDocuments = this._mapper.Map<IEnumerable<DocumentQueryResponse>>(document);
            return mappedDocuments;
        }

        public async Task<Document> GetById(int ID)
        {
            var res = await this._dbContext.Document.Where(x => x.Id == ID).FirstOrDefaultAsync();
            return res;
        }

        public async Task<IEnumerable<DocumentQueryResponse>> GetAll()
        {
            var res = await this._dbContext.Document.Select(x => x).Include(x => x.DocumentVersions).ToListAsync();
            var mappedDocuments = this._mapper.Map<IEnumerable<DocumentQueryResponse>>(res);
            return mappedDocuments;
        }

        public async Task<bool> IsDocumentInGrayList(int ID)
        {
            return await this._dbContext.GrayListDocument.AnyAsync(x => x.DocumentId == ID);
        }

        public async Task<IEnumerable<DocumentQueryResponse>> GetDocumentByPersonId(int id)
        {
            var document = await this._dbContext.Document
                            .Where(x => x.PersonId == id)
                            .Include(d => d.DocumentType)
                            .Include(d => d.DocumentVersions)
                            .ToListAsync();
            var mappedDocuments = this._mapper.Map<IEnumerable<DocumentQueryResponse>>(document);
            return mappedDocuments;
        }

        public async Task<Document> UploadDocument(Document document)
        {
            await this._dbContext.Document.AddAsync(document);
            await this._dbContext.SaveChangesAsync();
            document.DocumentType = await this._documentTypeRepository.Get(document.DocumentTypeId);
            return document;
        }

        public async Task<List<Document>> GetByPeopleIds(int?[] peopleIds)
        {
            var documents = await this._dbContext.Document.Where(x => peopleIds.Contains(x.PersonId)).ToListAsync();
            return documents;
        }
    }
}

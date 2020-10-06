using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class DocumentTypeRepository: IDocumentTypeRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public DocumentTypeRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<DocumentTypeQueryResponse>> GetAll()
        {
            var res = await _dbContext.DocumentType.OrderBy(x => x.Description).ToListAsync();
            var mappedDocuments = _mapper.Map<IEnumerable<DocumentTypeQueryResponse>>(res);

            return mappedDocuments;
        }
        public async Task<DocumentType> Get(int id)
        {
            var res = await _dbContext.DocumentType.Where(x => x.Id == id).FirstAsync();
            return res;
        }
    }
}

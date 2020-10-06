using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class DocumentLetterTypeRepository : IDocumentLetterTypeRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public DocumentLetterTypeRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<DocumentLetterTypeQueryResponse>> GetAll()
        {

            var DocumentLetterTypes = await _dbContext.DocumentLetterType.ToListAsync();
            var result = _mapper.Map<IEnumerable<DocumentLetterTypeQueryResponse>>(DocumentLetterTypes);

            return result;
        }

        public async Task<bool> Add(DocumentLetterTypeCommand entity)
        {
            var respMapped = this._mapper.Map<DocumentLetterType>(entity);
            this._dbContext.DocumentLetterType.Add(respMapped);
            var res = this._dbContext.SaveChanges();

            if (res > 0)
                return true;
            return false;

        }
    }
}

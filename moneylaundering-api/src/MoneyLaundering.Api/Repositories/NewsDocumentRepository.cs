using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MoneyLaundering.Api.Dto.Commands.Request;

namespace MoneyLaundering.Api.Repositories
{
    public class NewsDocumentRepository : Repository<NewsDocument>, INewsDocumentRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public NewsDocumentRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsDocument> GetByCaseId(int id)
        {
            var resp = await this._dbContext.NewsDocument
                        .FirstOrDefaultAsync(x => x.Id == id);

            var respMapped = this._mapper.Map<NewsDocument>(resp);
            return respMapped;
        }

        public async Task<NewsDocument> GetByNewsId(int id)
        {
            var resp = await this._dbContext.NewsDocument
                        .FirstOrDefaultAsync(x => x.NewsId == id);

            var respMapped = this._mapper.Map<NewsDocument>(resp);
            return respMapped;
        }

        public async Task<bool> Add(NewsDocumentCommand s)
        {
            var respMapped = new NewsDocument();
            respMapped.ContactAddress = s.ContactAddress;
            respMapped.ContactLocationId = s.ContactLocationId;
            respMapped.ContactZipCode = s.ContactZipCode;
            respMapped.DocumentLetterTypeId = s.DocumentLetterTypeId;
            respMapped.NewsId = s.NewsId;
            respMapped.Processed = s.Processed;
            this._dbContext.NewsDocument.Add(respMapped);
            return true;
        }
    }
}

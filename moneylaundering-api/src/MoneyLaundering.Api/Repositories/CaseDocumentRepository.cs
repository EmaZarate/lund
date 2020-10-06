using System;
using AutoMapper;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Repositories.Interfaces;


namespace MoneyLaundering.Api.Repositories
{
    public class CaseDocumentRepository : Repository<CaseDocument>, ICaseDocumentRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public CaseDocumentRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
    }
}

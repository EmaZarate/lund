using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class CaseGroupRepository: ICaseGroupRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public CaseGroupRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<CaseGroup>> GetAll()
        {
                var cases = await this._dbContext.CaseGroup
                    .ToListAsync();
                var result = this._mapper.Map<List<CaseGroup>>(cases);
                return result;
        }
    }
}

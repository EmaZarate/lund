using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class RiskRepository: IRiskRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public RiskRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<RiskQueryResponse>> GetAll()
        {

            var risks = await _dbContext.Risk.ToListAsync();
            var result = _mapper.Map<IEnumerable<RiskQueryResponse>>(risks);

            return result;
        }
    }
}

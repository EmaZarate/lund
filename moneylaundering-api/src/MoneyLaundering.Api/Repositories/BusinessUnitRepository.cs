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
    public class BusinessUnitRepository : IBusinessUnitRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public BusinessUnitRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<IEnumerable<BusinessUnit>> GetAll()
        {
            var businessUnits = await _dbContext.BusinessUnit.ToListAsync();
            var result = _mapper.Map<List<BusinessUnit>>(businessUnits);

            return result;
        }
    }
}

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
    public class ActivityRepository: IActivityRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public ActivityRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<ActivityQueryResponse>> GetAll()
        {
            var resp = await _dbContext.Activity.ToListAsync();
            var result = _mapper.Map<IEnumerable<ActivityQueryResponse>>(resp);
            return result;
        }
    }
}

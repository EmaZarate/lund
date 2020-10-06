using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class StateRepository : IStateRepository
    {   
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public StateRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<StateQueryResponse>> GetAll()
        {
           
            var states = await _dbContext.State.ToListAsync();
            var result = _mapper.Map<IEnumerable<StateQueryResponse>>(states);

            return result;
        }

        public async Task<StateQueryResponse> GetById(int id)
        {
            var state = await _dbContext.State.Where(s => s.Id == id)
                                              .FirstOrDefaultAsync();
            var result = _mapper.Map<StateQueryResponse>(state);

            return result;
        }

    }
}

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
    public class StatusRepository: IStatusRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        public StatusRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<Status>> GetAll()
        {
            var cases = await this._dbContext.Status
                .ToListAsync();
            var result = this._mapper.Map<List<Status>>(cases);
            return result;
        }

        public async Task<Status> GetStatusById(int id)
        {
            var res = await this._dbContext.Status.FirstOrDefaultAsync(x => x.Id == id);
            return res;
        }
    }
}

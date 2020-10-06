using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Repositories
{
    public class ProducerRepository : Repository<Producer>, IProducerRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public ProducerRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<Producer>> GetAll(ProducerQuery request)
        {
            var producers = await _dbContext.Producer.
                Where(x => 
                (!String.IsNullOrWhiteSpace(request.Name) ? x.ProduceName.Contains(request.Name) : true) &&
                (!String.IsNullOrWhiteSpace(request.Code) ? x.OriginCode.Contains(request.Code) : true) &&
                (request.BusinessUnitId != 0 ? request.BusinessUnitId == x.BusinessUnitId : true)
                ).ToListAsync();

            return producers;
        }
    }
}

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
    public class LocationRepository: ILocationRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public LocationRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<LocationQueryResponse>> GetLocationByStateId(int id)
        {
           
            var location = await this._dbContext.Location
                                    .Where(l => l.StateId == id)
                                    .ToListAsync();
            var mappedLocation = this._mapper.Map<IEnumerable<LocationQueryResponse>>(location);

            return mappedLocation;
        }

        public async Task<LocationQueryResponse> GetLocationById(int id)
        {
            var location = await this._dbContext.Location
                                        .Where(l => l.Id == id)
                                        .FirstOrDefaultAsync();
            var mappedLocation = this._mapper.Map<LocationQueryResponse>(location);
            return mappedLocation;
        }
    }
}

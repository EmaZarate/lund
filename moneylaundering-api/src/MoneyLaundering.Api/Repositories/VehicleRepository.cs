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
    public class VehicleRepository : Repository<Vehicle>, IVehicleRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public VehicleRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<Vehicle>> GetByCaseId(int caseId)
        {
            // SUMA_ASEGURADA
            var cases = await this._dbContext.Cases
            .Where(x => x.Id == caseId && x.CaseTypeId == 13)
            .ToListAsync();

            if (cases.Count() > 0)
            {
                var ids = await this._dbContext.CaseVehicle
                            .Where(x =>x.CaseId == caseId)
                            .Select(x=>x.LicensePlate)
                            .ToListAsync();

                if (ids.Count > 0)
                {
                    var resp = await this._dbContext.Vehicle
                                .Where(x => ids.Contains(x.LicensePlate))
                                .ToListAsync();

                    if (resp.Count > 0)
                    { 
                        return resp;
                    }
                }
            }

            return await this._dbContext.Vehicle
                        .Where(x => x.Year < 0)
                        .ToListAsync();
        }

    }
}

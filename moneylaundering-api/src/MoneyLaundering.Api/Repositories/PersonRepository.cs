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
    public class PersonRepository : Repository<Person>, IPersonRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public PersonRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<Person> GetById(int id)
        {
            var resp = await this._dbContext.Person
                        .Include(x => x.PersonBusinessUnits)
                        .ThenInclude(x => x.Risk)
                        .Include(x => x.GrayLists)
                        .FirstOrDefaultAsync(x => x.Id == id);

            var respMapped = this._mapper.Map<Person>(resp);
            return respMapped;
        }

        public async Task<IEnumerable<Person>> GetByGroupCode(int id)
        {
            var resp = await this._dbContext.Person
                        .Include(x => x.PersonBusinessUnits)
                        .ThenInclude(x => x.Risk)
                        .Include(x => x.GrayLists)
                        .Where(x => x.Group == false && x.GroupCode == id)
                        .ToListAsync();

            return resp;
        }

        public async Task<IEnumerable<Person>> GetAll(PersonQuery request)
        {
            var resp = await this._dbContext.Person

                                    .Where(x => ((request.cuit == null
                                                || request.cuit.Trim() == ""
                                                || x.Cuit.Contains(request.cuit))

                                            && (request.fullName == null
                                                || request.fullName.Trim() == ""
                                                || (x.FirstName + " " + x.LastName).ToLower().Contains(request.fullName.ToLower()))
                                            && (request.group ? x.Group : true)
                                            && (request.getWithoutGrouping ? (!x.Group && x.GroupCode == null) : true)
                                            && (request.groupCode != 0 ? (x.GroupCode == request.groupCode) : true)
                                            // By default it returns all the persons that are active unless explicitly received false //
                                            && (request.active != null ? (x.Active == request.active) : x.Active == true)
                                                )


                                    )
                                    .Include(x => x.BusinessUnit)
                                    .Include(x => x.PersonBusinessUnits)
                                    .ThenInclude(x => x.Risk)


                                    .Where(x => x.PersonBusinessUnits.Any(j => ((request.riskId == null
                                                                                || request.riskId == 0
                                                                                || j.RiskId == request.riskId)

                                                                            && (request.tranBefore == null
                                                                                || request.tranBefore.Trim() == ""
                                                                                || j.FinancialProfile >= Convert.ToInt32(request.tranBefore))

                                                                            && (request.tranAfter == null
                                                                                || request.tranAfter.Trim() == ""
                                                                                || j.FinancialProfile <= Convert.ToInt32(request.tranAfter))

                                                                           && (request.businessUnitId == null
                                                                                || request.businessUnitId == 0
                                                                                || j.BusinessUnitId == request.businessUnitId)
                                                                                )
                                                                            ))

                                    .Include(x => x.GrayLists)
                                    .ToListAsync();

            return resp;
        }

        public async Task<bool> BusinessUnitUpdate(PersonBusinessUnitCommand entity)
        {
            var change = _dbContext.PersonBusinessUnit.Single(x => x.Id == entity.Id);

            if (entity.AssignedRisk != null)
            {
                change.RiskId = entity.AssignedRisk;
                change.FinancialProfile = entity.FinancialProfile;
                change.AssignedRisk = entity.AssignedRisk;
            }
            else
            {
                change.RiskId = change.CalcRisk;
                change.FinancialProfile = entity.FinancialProfile;
                change.AssignedRisk = entity.AssignedRisk;
    
            }

            var res = this._dbContext.SaveChanges();

            if (res > 0)
                return true;

            return false;
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class PersonBusinessUnitRepository : Repository<PersonBusinessUnit>, IPersonBusinessUnitRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public PersonBusinessUnitRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<List<PersonBusinessUnit>> GetByPeopleIds(int?[] peopleIds)
        {
            var personBusinessUnit = await this._dbContext.PersonBusinessUnit.Where(x => peopleIds.Contains(x.PersonId)).ToListAsync();
            return personBusinessUnit;
        }
    }
}

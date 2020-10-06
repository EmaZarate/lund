using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<User>> GetByRoleId(string roleId, int applicationId)
        {
            var result = await _dbContext.UserRole
                                            .Where(x => x.RoleId == roleId && x.ApplicationId == applicationId)
                                         //.Where(x => x.RoleId.Contains(roleId) && x.ApplicationId == applicationId)
                                         .Select(m => m.User).ToListAsync();
            return result;
        }
    }
}

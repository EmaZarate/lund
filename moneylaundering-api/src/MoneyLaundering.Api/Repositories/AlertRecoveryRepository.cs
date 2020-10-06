using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class AlertRecoveryRepository : IAlertRecoveryRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public AlertRecoveryRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<bool> AlertRecoveryUpdate(AlertRecoveryCommand entity)
        {
            // EXEC spAlertRecovery resp OUT
            var resp = 1;

            if (resp > 0)
                return true;

            return false;
        }
    }
}
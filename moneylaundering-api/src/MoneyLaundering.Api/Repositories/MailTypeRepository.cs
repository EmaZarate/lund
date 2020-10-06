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
    public class MailTypeRepository : IMailTypeRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public MailTypeRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<MailTypeQueryResponse>> GetAll()
        {

            var MailTypes = await _dbContext.MailType.ToListAsync();
            var result = _mapper.Map<IEnumerable<MailTypeQueryResponse>>(MailTypes);

            return result;
        }
    }
}

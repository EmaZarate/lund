using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class NewsTypeRepository : INewsTypeRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public NewsTypeRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsType> GetNewsTypeByDescription(string description)
        {
            var res = await this._dbContext.NewsType.Where(x => x.Description.ToLower().Contains(description)).FirstOrDefaultAsync();
            return res; 
        }
    }
}

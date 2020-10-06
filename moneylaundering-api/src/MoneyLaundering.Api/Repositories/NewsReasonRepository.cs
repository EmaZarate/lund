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
    public class NewsReasonRepository : INewsReasonRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public NewsReasonRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<NewsReasonQueryResponse>> GetAll(int id)
        {
            // Getting all GLOBAL reasons
            var newsGlobalReasons = await this._dbContext.NewsReasonType
                                        .Where(x => x.Global == true) 
                                        .ToListAsync();

            // Getting all reasons that matches the ID 
            var newsReasons = await this._dbContext.NewsReason
                                        .Where(x => x.NewsTypeId == id)
                                        .ToListAsync();
            
            var newsReasonMapped = this._mapper.Map<IEnumerable<NewsReasonQueryResponse>>(newsReasons).ToList();
            var newsGlobalReasonMapped = this._mapper.Map<IEnumerable<NewsReasonQueryResponse>>(newsGlobalReasons).ToList();

            // Adding all the GLOBAL reasons to the ones that matches the ID
            foreach (var item in newsGlobalReasonMapped)
            {
                newsReasonMapped.Add(item);
            }

            return newsReasonMapped.OrderBy(x => x.Description);
        }
    }
}

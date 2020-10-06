using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class NewsRepository : INewsRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public NewsRepository(DataContext dbContext, IMapper mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<News> GetNewByCase(int actualStageId, int businessUnitId, int caseId)
        {
            var res = await this._dbContext.News.Where(x => x.Id == actualStageId && x.BusinessUnitId == businessUnitId && x.CaseId == caseId).FirstOrDefaultAsync();
            return res; 
        }

        public async Task<News> GetNewsById(int? Id)
        => await this._dbContext.News.FirstOrDefaultAsync(x => x.Id == Id);


        public async Task<IEnumerable<NewsQueryResponse>> GetNewByCaseAndBussinessUnit(int caseId, int businessUnitId)
        {
            var res2 = this._dbContext.NewsType.Where(x => x.Id == 13).FirstOrDefaultAsync();
            var res = this._dbContext.News
                                                .Include(n => n.NewsType)
                                                .Include(s => s.Status)
                                                .Where(x => x.CaseId == caseId && x.BusinessUnitId == businessUnitId)
                                                .ToList();
            return this._mapper.Map<IEnumerable<NewsQueryResponse>>(res);
        }
        public void Add(News News) 
        {
            this._dbContext.News.Add(News);
        }

        public async Task<bool> Save()
        {
            var res = await this._dbContext.SaveChangesAsync();

            if (res > 0)
                return true;
            return false;
        }

        public async Task<bool> UpdateNews(News entity)
        {
            this._dbContext.Entry(entity).State = EntityState.Modified;
            var res = this._dbContext.SaveChanges();
            this._dbContext.Entry(entity).State = EntityState.Detached;
            if (res > 0)
                return true;
            return false;
        }

        public async Task<bool> CreateNews(News entity)
        {
            if (entity.Status.DefaultExpiration == null && entity.Status.WarningDays == null)
                entity.ExpirationDate = null;

            this._dbContext.News.Add(entity);
            var res = this._dbContext.SaveChanges();

            if (res > 0)
                return true;
            return false;
        }
    }
}

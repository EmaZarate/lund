using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : Entity
    {
        private readonly DataContext dbContext;
        private readonly IMapper mapper;

        public Repository(DataContext dbContext, IMapper mapper)
        {
            Argument.ThrowIfNull(dbContext, nameof(dbContext));
            Argument.ThrowIfNull(mapper, nameof(mapper));

            this.dbContext = dbContext;
            this.mapper = mapper;

        }

        public async Task<PagedResultsQueryResponse<TEntity>> GetPagedResults(int actualPage, int itemsPerPage, string orderBy, bool ascending, Expression<Func<TEntity, bool>> expression)
        {
            var queryable = dbContext.Set<TEntity>();

            var skipNumber = itemsPerPage * (actualPage - 1);

            List<TEntity> query;

            if (orderBy != null && ascending) {

                query = await queryable.Where(expression).OrderBy(orderBy + " ASC").Skip(skipNumber).Take(itemsPerPage).ToListAsync();
            } else if (orderBy != null && !ascending) {
                query = await queryable.Where(expression).OrderBy(orderBy + " DESC").Skip(skipNumber).Take(itemsPerPage).ToListAsync();
            } else {
                query = await queryable.Where(expression).Skip(skipNumber).Take(itemsPerPage).ToListAsync();
            }

            var numberOfRecords = await queryable.Where(expression).CountAsync();

            var result = new PagedResultsQueryResponse<TEntity>
            {
                Results = query,
                ItemsPerPage = itemsPerPage,
                TotalItems = numberOfRecords,
                ActualPage = actualPage
            };

            return result;
        }

        public IQueryable<TEntity> All()
        {
            return this.dbContext.Set<TEntity>();
        }

        public IEnumerable<T> All<T>()
        {
            var result = this.dbContext.Set<TEntity>();
            var mapped = this.mapper.Map<IEnumerable<T>>(result);
            return mapped;
        }

        public Task<TEntity> GetAsync(params object[] keyValues)
        {
            return this.dbContext.Set<TEntity>().FindAsync(keyValues).AsTask();
        }

        public Task<T> GetAsync<T>(params object[] keyValues)
        {
            var result = this.dbContext.Set<TEntity>().FindAsync(keyValues);
            var mapped = this.mapper.Map<T>(result);
            return Task.FromResult(mapped);
        }

        public Task SaveAsync(TEntity entity)
        {
            if (this.dbContext.Entry(entity).State == EntityState.Detached)
            {
                this.dbContext.Set<TEntity>().Add(entity);
            }
            return this.dbContext.SaveChangesAsync();
        }

        public Task<List<TEntity>> GetAsync(int?[] keyValues)
        {
            return this.dbContext.Set<TEntity>().Where(x => keyValues.Contains(x.Id)).ToListAsync();
        }

        public Task Update(List<TEntity> entity)
        {
            this.dbContext.Set<TEntity>().UpdateRange(entity);
            return Task.CompletedTask;
        }
        public Task Update(TEntity entity)
        {
            this.dbContext.Set<TEntity>().Update(entity);
            return this.dbContext.SaveChangesAsync();
        }

        public async Task<int> GetLength(Expression<Func<TEntity, bool>> expression)
        {
            var count = this.dbContext.Set<TEntity>().Where(expression).Count();
            return count;
        }
    }
}

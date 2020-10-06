using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using MoneyLaundering.Api.Domain.Entities.Base;
using MoneyLaundering.Api.Dto.Queries.Requests;

namespace MoneyLaundering.Api.Repositories
{
    public interface IRepository<TEntity>
        where TEntity : Entity
    {
        Task<TEntity> GetAsync(params object[] keyValues);
        Task<T> GetAsync<T>(params object[] keyValues);
        Task SaveAsync(TEntity entity);
        IQueryable<TEntity> All();
        IEnumerable<T> All<T>();
        Task<List<TEntity>> GetAsync(int?[] keyValues);
        Task Update(List<TEntity> entity);
        Task Update(TEntity entity);
        Task<int> GetLength(Expression<Func<TEntity, bool>> expression);
        Task<PagedResultsQueryResponse<TEntity>> GetPagedResults(int page, int pageSize, string orderBy, bool ascending, Expression<Func<TEntity, bool>> expression);
    }
}

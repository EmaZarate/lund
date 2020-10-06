using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities.Base;
using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Repositories
{
    public class EntityLoader : IEntityLoader
    {
        private readonly DataContext dbContext;
        public EntityLoader(DataContext dbContext)
        {
            Argument.ThrowIfNull(dbContext, nameof(dbContext));

            this.dbContext = dbContext;
        }

        public TEntity Load<TEntity>(params object[] keyValues)
            where TEntity : Entity
        {
            return this.dbContext.Set<TEntity>().Find(keyValues);
        }
    }
}

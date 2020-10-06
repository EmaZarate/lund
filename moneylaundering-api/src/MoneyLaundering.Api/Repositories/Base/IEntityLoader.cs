using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Repositories
{
    public interface IEntityLoader
    {
        TEntity Load<TEntity>(params object[] keyValues) where TEntity : Entity;
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Product : Entity
    {
        public virtual string Description { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Country : Entity
    {
        public virtual string Description { get; set; }
    }
}

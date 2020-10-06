using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class State : Entity
    {
        public virtual string Description { get; set; }
        public virtual int CountryId { get; set; }
    }
}

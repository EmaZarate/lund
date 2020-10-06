using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class LimitAssuredSum : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int ProductId { get; set; }
        public virtual int IndividualStop { get; set; }
        public virtual int AccumulatedStop { get; set; }
    }
}

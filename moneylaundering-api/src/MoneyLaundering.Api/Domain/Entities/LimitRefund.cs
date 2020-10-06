using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class LimitRefund : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual short RiskType { get; set; }
        public virtual double? Limit { get; set; }
    }
}

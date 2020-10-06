using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class RiskAssignmentRangesLog : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual bool Pep { get; set; }
        public virtual double LimitDown { get; set; }
        public virtual double LimitHigh { get; set; }
    }
}

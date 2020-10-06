using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class RiskAssignmentRanges : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual bool Pep { get; set; }
        public virtual double LimitDown { get; set; }
        public virtual double LimitMedium { get; set; }
    }
}

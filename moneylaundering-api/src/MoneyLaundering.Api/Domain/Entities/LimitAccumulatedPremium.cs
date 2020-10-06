using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class LimitAccumulatedPremium : Entity
	{
        public virtual int BusinessUnitId { get; set; }
        public virtual string PersonType { get; set; }
        public virtual short? RiskType { get; set; }
        public virtual double? Limit { get; set; }
	}
}

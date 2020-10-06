using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Antiquity : Entity
	{
		public virtual int BusinessUnitId { get; set; }
		public virtual short RiskHighTo { get; set; }
		public virtual short RiskMediumTo { get; set; }
	}
}

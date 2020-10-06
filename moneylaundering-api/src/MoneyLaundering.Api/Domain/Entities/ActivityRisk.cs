using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class ActivityRisk : Entity
	{
		public virtual int BusinessUnitId { get; set; }
		public virtual int ActivityId { get; set; }
		public virtual short? RiskPH { get; set; }
		public virtual short? RiskPJ { get; set; }
	}
}

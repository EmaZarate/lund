using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class PersonBusinessUnit : Entity
	{
		public virtual int PersonId { get; set; }
		public virtual Person Person { get; set; }
		public virtual int BusinessUnitId { get; set; }
		public virtual BusinessUnit BusinessUnit { get; set;}
		public virtual int? FinancialProfile { get; set; }
		public virtual int? CalcRisk { get; set; }
		public virtual int? AssignedRisk { get; set; }
		public virtual int? RiskId { get; set; }
		public virtual Risk Risk { get; set; }
	}
}

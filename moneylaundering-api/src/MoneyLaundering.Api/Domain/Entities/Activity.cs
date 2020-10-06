using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class Activity : Entity
	{
		public virtual string Description { get; set; }
		public virtual bool? ObligatedSubject { get; set; }
	}
}

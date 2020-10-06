using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class Vehicle : Entity
	{
		public virtual string LicensePlate { get; set; }
		public virtual string Make { get; set; }
		public virtual string Model { get; set; }
		public virtual string Version { get; set; }
		public virtual short? Year { get; set; }
	}
}

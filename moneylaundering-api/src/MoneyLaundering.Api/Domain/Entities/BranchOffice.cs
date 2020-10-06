using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class BranchOffice : Entity
    {
		public virtual string Description { get; set; }
		public virtual string Mail { get; set; }
		public virtual string Address { get; set; }
		public virtual int? StateId { get; set; }
		public virtual int? CountryId { get; set; }
		public virtual int? ZipCode { get; set; }
	}
}

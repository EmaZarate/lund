using System;
using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class PersonWareHouse : Entity
	{
		public virtual string UniqueKey { get; set; }
		public virtual int? PartnerNumber { get; set; }
		public virtual string TaxId { get; set; }
		public virtual string LastNamePartner { get; set; }
		public virtual string FirstNamePartner { get; set; }
		public virtual string PersonType { get; set; }
		public virtual string Email { get; set; }
		public virtual int? ActivityId { get; set; }
		public virtual string ActivityDescription { get; set; }
		public virtual string UIFStatus { get; set; }
		public virtual string Nationality { get; set; }
		public virtual string CountryOfResidence { get; set; }
		public virtual string Address { get; set; }
		public virtual string Location { get; set; }
		public virtual int? ZipCode { get; set; }
		public virtual string State { get; set; }
		public virtual string Country { get; set; }
		public virtual DateTime? PolicyFirstDate { get; set; }
	}
}

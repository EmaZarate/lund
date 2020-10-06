using System;
using System.Collections.Generic;
using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Person : Entity
	{
		public virtual string PersonKey { get; set; }
		public virtual int BusinessUnitId { get; set; }
		public virtual BusinessUnit BusinessUnit { get; set; }
		public virtual string Cuit { get; set; }
		public virtual string LastName { get; set; }
		public virtual string FirstName { get; set; }
		public virtual bool Active { get; set; }
		public virtual DateTime CreationDate { get; set; }
		public virtual DateTime? UpdateDocumentDate { get; set; }
		public virtual bool? Pep { get; set; }
		public virtual bool? PepSystem { get; set; }
		public virtual bool? RegisterUIF { get; set; }
		public virtual bool? Terrorist { get; set; }
		public virtual DateTime? CheckListDate { get; set; }
		public virtual string PersonType { get; set; }
		public virtual string Mail { get; set; }
		public virtual int? ActivityId { get; set; }
		public virtual int? LocationId { get; set; }
        public virtual Location Location { get; set; }
        public virtual string Address { get; set; }
		public virtual string OfficialTypeId { get; set; }
		public virtual int? TaxId { get; set; }
		public virtual string Nationality { get; set; }
		public virtual DateTime? BirthDate { get; set; }
		public virtual string Maritalstatus { get; set; }
		public virtual string PhoneNumber { get; set; }
		public virtual bool ThirdParty { get; set; }
		public virtual int? GroupCode { get; set; }
		public virtual bool Group { get; set; }
		public virtual int? ZipCode { get; set; }
		public virtual DateTime? RegistrationDate { get; set; }
		public virtual string RegistrationNumber { get; set; }
		public virtual List<PersonBusinessUnit> PersonBusinessUnits { get; set; }
		public virtual List<GrayList> GrayLists { get; set; }
	}
}

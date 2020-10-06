using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class PersonGroupQueryResponse
    {
        public int Id { get; set; }
        public string PersonKey { get; set; }
        public int BusinessUnitId { get; set; }
        public BusinessUnitQueryResponse BusinessUnit { get; set; }
        public string Cuit { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public bool Active { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime UpdateDocumentDate { get; set; }
        public bool Pep { get; set; }
        public bool PepSystem { get; set; }
        public bool RegisterUIF { get; set; }
        public bool Terrorist { get; set; }
        public DateTime CheckListDate { get; set; }
        public string PersonType { get; set; }
        public string Mail { get; set; }
        public int ActivityId { get; set; }
        public int LocationId { get; set; }
        public LocationQueryResponse Location { get; set; }
        public string Address { get; set; }
        public string OfficialTypeId { get; set; }
        public int TaxId { get; set; }
        public string Nationality { get; set; }
        public DateTime BirthDate { get; set; }
        public string Maritalstatus { get; set; }
        public string PhoneNumber { get; set; }
        public bool ThirdParty { get; set; }
        public int GroupCode { get; set; }
        public bool Group { get; set; }
        public int ZipCode { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string RegistrationNumber { get; set; }
        public List<PersonBusinessUnitResponse> PersonBusinessUnits { get; set; }
        public List<GrayListQueryResponse> GrayLists { get; set; }


    }
}

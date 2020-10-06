using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class BusinessUnitQueryResponse
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public IEnumerable<PersonBusinessUnitQueryResponse> PersonBusinessUnits { get; set; }
        public IEnumerable<ProducerQueryResponse> Producers { get; set; }

    }

}

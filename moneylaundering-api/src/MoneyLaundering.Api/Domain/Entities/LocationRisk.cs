using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class LocationRisk : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int LocationId { get; set; }
        public virtual int ZipCode { get; set; }
        public virtual int? RiskId { get; set; }
    }
}

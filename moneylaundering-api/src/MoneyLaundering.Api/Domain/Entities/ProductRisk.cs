using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class ProductRisk : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int ProductId { get; set; }
        public virtual int? RiskId { get; set; }
    }
}

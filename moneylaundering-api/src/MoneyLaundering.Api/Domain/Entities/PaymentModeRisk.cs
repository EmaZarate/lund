using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class PaymentModeRisk : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int PaymentModeId { get; set; }
        public virtual int? RiskId { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class ChannelRisk : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int ChannelId { get; set; }
        public virtual int? RiskId { get; set; }
    }
}

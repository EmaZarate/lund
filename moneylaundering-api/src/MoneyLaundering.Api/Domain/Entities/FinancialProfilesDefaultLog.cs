using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class FinancialProfilesDefaultLog : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual string PersonType { get; set; }
        public virtual short RiskType { get; set; }
        public virtual int FinancialProfile { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class NewsRiskChange : Entity
    {
        public virtual  int NewsId { get; set; }
        public virtual  short NewRisk { get; set; }
    }
}

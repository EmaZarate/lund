using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class NewsReasonType : Entity
    {
        public virtual string Description { get; set; }
        public virtual bool Global { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class NewsReason : Entity
    {
        public virtual NewsReasonType NewsReasonType { get; set; }
        public virtual int NewsTypeId { get; set; }
    }
}

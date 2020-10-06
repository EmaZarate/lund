using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class CaseType : Entity
    {
        public virtual string Description { get; set; }
        public virtual int? CaseGroupId { get; set; }
    }
}

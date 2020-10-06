using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class MessageType : Entity
    {
        public virtual string Description { get; set; }
    }
}

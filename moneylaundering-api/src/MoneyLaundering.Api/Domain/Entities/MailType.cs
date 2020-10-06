using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class MailType : Entity
    {
        public virtual string Description { get; set; }
        public virtual string Subject { get; set; }
        public virtual string Message { get; set; }
    }
}

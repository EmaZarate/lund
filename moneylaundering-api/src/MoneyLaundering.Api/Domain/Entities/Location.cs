using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Location : Entity
    {
        public virtual string Description { get; set; }
        public virtual State State { get; set; }
        public virtual int StateId { get; set; }
        public virtual int ZipCode { get; set; }
    }
}

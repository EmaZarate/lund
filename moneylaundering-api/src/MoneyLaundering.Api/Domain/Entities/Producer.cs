using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Producer : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual BusinessUnit BusinessUnit { get; set; }
        public virtual string ProduceName { get; set; }
        public virtual string Mail { get; set; }
        public virtual string OriginCode { get; set; }
    }
}

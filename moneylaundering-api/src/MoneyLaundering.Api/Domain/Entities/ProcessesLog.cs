using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class ProcessesLog : Entity
    {
        public virtual int ProcessesId { get; set; }
        public virtual string Message { get; set; }
        public virtual int MessageTypeId { get; set; }
        public virtual int BusinessUnitId { get; set; }
    }
}

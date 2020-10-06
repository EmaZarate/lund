using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class CaseDocument : Entity
    {
        public virtual int CaseId { get; set; }
        public virtual Case Case { get; set; }
        public virtual int DocumentId { get; set; }
        public virtual Document Document { get; set; }
        public virtual int BusinessUnitId { get; set; }
    }
}

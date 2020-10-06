using System;
using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class DocumentVersion : Entity
    {
        public virtual int DocumentId { get; set; }
        public virtual int VersionId { get; set; }
        public virtual string PhysicalName { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual string Comment { get; set; }
        public virtual DateTime? Expiration { get; set; }
	}
}

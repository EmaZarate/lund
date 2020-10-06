using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class NewsDocument : Entity
    {
		public virtual string ContactAddress { get; set; }
		public virtual int ContactLocationId { get; set; }
		public virtual int ContactZipCode { get; set; }
		public virtual int DocumentLetterTypeId { get; set; }
		public virtual int NewsId { get; set; }
		public virtual bool Processed { get; set; }
	}
}

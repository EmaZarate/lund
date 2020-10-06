using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
	public class NewsMail : Entity
	{
		public virtual int CaseId { get; set; }
		public virtual int NewsId { get; set; }
		public virtual int BusinessUnitId { get; set; }
		public virtual string ContactMail { get; set; }
		public virtual int MailTypeId { get; set; }
		public virtual string Subject { get; set; }
		public virtual string Message { get; set; }
	}
}

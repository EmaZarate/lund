using System;
using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class News : Entity
	{
		public virtual int BusinessUnitId { get; set; }
        public virtual int CaseId { get; set; }
		public virtual int NewsTypeId { get; set; }
		public virtual NewsType NewsType { get; set; }
		public virtual int StatusId { get; set; }
		public virtual Status Status { get; set; }
		public virtual DateTime CreateDate { get; set; }
		public virtual DateTime? EndDate { get; set; }
		public virtual DateTime? ExpirationDate { get; set; }
		public virtual string Comments { get; set; }
		public virtual int? NewsReasonTypeId { get; set; }

        public virtual void SetEndDate(DateTime endDate) 
        {
            EndDate = endDate;
        }
    }
}

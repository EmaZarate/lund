using MoneyLaundering.Api.Domain.Entities.Base;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Document : Entity
	{
		public virtual int PersonId { get; set; }
		public virtual int? PersonOrignalId { get; set; }
		public virtual string LogicName { get; set; }
		public int DocumentTypeId { get; set; }
		public virtual DocumentType DocumentType { get; set; }
		public virtual ICollection<DocumentVersion> DocumentVersions { get; set; }
		public virtual bool Confidential { get; set; }
		public virtual ICollection<CaseDocument> CaseDocuments { get; set; }
	}
}

using MoneyLaundering.Api.Domain.Entities.Base;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class GrayListDocument : Entity
    {
        public virtual int DocumentId { get; set; }
        public virtual Document Document { get; set; }
        public virtual int GrayListId { get; set; }

        public virtual List<GrayListDocument> AddGrayListDocument(int GrayListId, List<int> DocumentIds)
        {
            List<GrayListDocument> documents = new List<GrayListDocument>(); 
            foreach(var DocumentId in DocumentIds)
            {
                var entity = new GrayListDocument
                {
                    GrayListId = GrayListId,
                    DocumentId = DocumentId
                };

                documents.Add(entity);

            }

            return documents;

        }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;
using System;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class GrayList : Entity
    {
        public virtual string Comments { get; set; }
        public virtual bool Active { get; set; }
        public virtual DateTime CreationDate { get; set; }
        public virtual int? PersonId { get; set; }
        public virtual Person Person { get; set; }
        public virtual int? PersonOriginalId { get; set; }

        public virtual GrayList AddGrayList(int PersonId, string Comments)
        {
            var entity = new GrayList
            {
                PersonId = PersonId,
                Active = true,
                Comments = Comments,
                CreationDate = DateTime.Now
            };

            return entity;
        }

        public virtual void UpdateComment(string Comments)
        {
            this.Comments = Comments;
        }

        public virtual void DeactivateGrayListItem(bool Active)
        {
            this.Active = Active;
        }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class UserRole: Entity
    {
        [NotMapped]
        public override int Id { get; set; }
        public virtual string RoleId { get; set; }
        public virtual string UserId { get; set; }
        public virtual bool? IsLocked { get; set; }
        public virtual int ApplicationId { get; set; }
        public virtual DateTime? CreatedDate { get; set; }
        public virtual Roles Role { get; set; }
        public virtual User User { get; set; }

    }
}

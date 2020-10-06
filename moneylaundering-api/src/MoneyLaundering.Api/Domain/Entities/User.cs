using MoneyLaundering.Api.Domain.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class User: Entity
    {
        [NotMapped]
        public override int Id { get; set; }
        public virtual string UserId { get; set; }
        public virtual string UserName { get; set; }
        public virtual string Email { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual DateTime? CreatedDate { get; set; }
        public virtual string TaxId { get; set; }
        public virtual string OfficialIdType { get; set; }
        public virtual string CuitCuil { get; set; }
        public virtual string Gender { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<Case> Cases { get; set; }
    }
}

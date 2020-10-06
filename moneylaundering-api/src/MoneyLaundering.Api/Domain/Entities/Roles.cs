using MoneyLaundering.Api.Domain.Entities.Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Roles: Entity
    {
        [NotMapped]
        public override int Id { get; set; }
        public virtual string RoleId { get; set; }
        public virtual string Name { get; set; }
        public virtual string NormalizedName { get; set; }
        public virtual string Description { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}

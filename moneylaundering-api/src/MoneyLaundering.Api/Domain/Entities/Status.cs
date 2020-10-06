using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Status : Entity
    {
        public virtual string Description { get; set; }
        public virtual bool Finisher { get; set; }
        public virtual int? DefaultExpiration { get; set; }
        public virtual int? WarningDays { get; set; }
    }
}

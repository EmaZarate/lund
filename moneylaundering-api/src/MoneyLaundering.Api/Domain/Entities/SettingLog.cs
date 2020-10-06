using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class SettingLog : Entity
    {
        public virtual string SettingName { get; set; }
        public virtual string OldValue { get; set; }
        public virtual string ActualValue { get; set; }
    }
}

using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class OperatedVolume : Entity
    {
        public virtual  int BusinessUnitId { get; set; }
        public virtual  double FromDown { get; set; }
        public virtual  double FromMedium { get; set; }
    }
}

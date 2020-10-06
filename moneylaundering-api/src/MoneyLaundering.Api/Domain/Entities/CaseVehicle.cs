using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class CaseVehicle : Entity
    {
        public virtual int BusinessUnitId { get; set; }
        public virtual int CaseId { get; set; }
        public virtual string LicensePlate { get; set; }
    }
}

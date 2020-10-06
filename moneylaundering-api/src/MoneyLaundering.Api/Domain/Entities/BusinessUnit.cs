using MoneyLaundering.Api.Domain.Entities.Base;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class BusinessUnit : Entity
    {
        public virtual string Description { get; set; }
        public virtual List<PersonBusinessUnit> PersonBusinessUnits { get; set; }
        public virtual List<Producer> Producers { get; set; }
    }
}

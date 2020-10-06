using System;
using MoneyLaundering.Api.Domain.Entities.Base;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Setting : Entity
	{
        public virtual string SettingName { get; set; }
        public virtual string StringValue { get; set; }
        public virtual int? IntValue { get; set; }
        public virtual decimal? DecimalValue { get; set; }
        public virtual DateTime? DateTimeValue { get; set; }
        public virtual bool? BooleanValue { get; set; }
        public virtual bool Edit { get; set; }
        public virtual string Description { get; set; }
	}
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Identity.Api.Sdk.Lib;


namespace MoneyLaundering.Api.Crosscutting.Identifiers
{
    public class ExtendedRoles
    {
        public const string AllRoles = Roles.Analyst + "," + Roles.Higher + "," + Roles.ComplianceOfficer ;
        public const string AnalystAndHigher = Roles.Analyst + "," + Roles.Higher;
        public const string HigherAndCO = Roles.Higher + "," + Roles.ComplianceOfficer;
    }
}

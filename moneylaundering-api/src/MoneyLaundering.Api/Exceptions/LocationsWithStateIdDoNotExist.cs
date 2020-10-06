using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class LocationsWithStateIdDoNotExist: Exception
    {
        public LocationsWithStateIdDoNotExist(string Msg) : base(Msg) 
        { 
        }
    }
}

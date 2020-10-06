using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class StatesAreNotFound: Exception
    {
        public StatesAreNotFound(string Msg) : base(Msg) 
        { 
        }
    }
}

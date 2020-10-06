using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class NoActionException : Exception
    {
        public NoActionException(string Msg) : base(Msg)
        {
        }
    }
}

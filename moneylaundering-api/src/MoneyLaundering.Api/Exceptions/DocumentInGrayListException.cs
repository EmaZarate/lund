using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class DocumentInGrayListException : Exception
    {
        public DocumentInGrayListException(string Msg): base(Msg) { }
    }
}

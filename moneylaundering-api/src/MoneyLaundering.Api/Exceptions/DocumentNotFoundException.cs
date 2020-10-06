using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class DocumentNotFoundException: Exception
    {
        public DocumentNotFoundException(string Msg): base(Msg) { }
    }
}

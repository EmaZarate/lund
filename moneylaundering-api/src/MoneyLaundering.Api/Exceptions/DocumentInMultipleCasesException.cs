using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class DocumentInMultipleCasesException : Exception
    {
        public DocumentInMultipleCasesException(string Msg): base(Msg) { }
    }
}

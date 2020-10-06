using System;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class NoDocumentResultsWithPersonId: Exception
    {
        public NoDocumentResultsWithPersonId(string Msg): base(Msg)
        {

        }
    }
}

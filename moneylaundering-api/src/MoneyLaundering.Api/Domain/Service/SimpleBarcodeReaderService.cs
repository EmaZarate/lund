using System.Collections.Generic;
using System.Linq;
using Identity.Api.Sdk.Lib;


namespace MoneyLaundering.Api.Domain.Service
{
    public class SimpleBarcodeReaderService : BaseBarcodeReaderService
    {
        public SimpleBarcodeReaderService(IUserSession userSession)
            : base(userSession)
        {
        }

        protected override IEnumerable<string> ReadCore(File file)
        {
            return new string[] { }.AsEnumerable();
        }
    }
}

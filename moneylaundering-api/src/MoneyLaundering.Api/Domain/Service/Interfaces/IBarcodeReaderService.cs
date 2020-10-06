using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain
{
    public interface IBarcodeReaderService
    {
        IEnumerable<string> Read(File file);
    }
}

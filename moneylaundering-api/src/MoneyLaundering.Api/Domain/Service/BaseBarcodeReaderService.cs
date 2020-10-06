using Identity.Api.Sdk.Lib;
using MoneyLaundering.Api.Infrastructure;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace MoneyLaundering.Api.Domain.Service
{
    public abstract class BaseBarcodeReaderService: IBarcodeReaderService
    {
        protected readonly IUserSession userSession;

        protected BaseBarcodeReaderService(IUserSession userSession)
        {
            Argument.ThrowIfNull(userSession, nameof(userSession));

            this.userSession = userSession;
        }

        public IEnumerable<string> Read(File file)
        {
            var invoiceBarcodeRegex = new Regex($"(\\d{{31}}|\\d{{30}}|\\d{{29}})");

            var barcodes = this.ReadCore(file);

            var invoiceBarcodes = barcodes
                .Select(t => invoiceBarcodeRegex.Match(t))
                .Select(m => m.Value)
                .Where(b => !string.IsNullOrWhiteSpace(b));

            //if (!invoiceBarcodes.Any())
            //{
            //    this.telemetryClientAdapter.TrackBarcodeReadingFailed(this.userSession, file.Filename);
            //}

            return invoiceBarcodes;
        }

        protected abstract IEnumerable<string> ReadCore(File file);
    }
}

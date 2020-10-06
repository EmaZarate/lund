using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain
{
    public class File
    {
        public virtual string Filename { get; protected set; }
        public virtual byte[] Data { get; protected set; }

        protected File() { }
        public File(string filename, byte[] data)
        {
            this.Filename = filename;
            this.Data = data;
        }

        public virtual IEnumerable<string> ReadBarcodes(IBarcodeReaderService barcodeReader)
        {
            return barcodeReader.Read(this);
        }
    }
}

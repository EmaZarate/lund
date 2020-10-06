using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class DeleteFileCommand : IRequest<bool>
    {
        public string FileName { get; set; }
        public DeleteFileCommand(string fileName)
        {
            this.FileName = fileName;
        }
    }
}

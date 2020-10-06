using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Repositories.Interfaces;

namespace MoneyLaundering.Api.Services.File.Handlers
{
    public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand, bool>
    {
        private readonly IFileRepository fileRepository;
        public DeleteFileCommandHandler(IFileRepository fileRepository)
        {
            this.fileRepository = fileRepository ?? throw new ArgumentNullException(nameof(fileRepository));
        }

        public async Task<bool> Handle(DeleteFileCommand request, CancellationToken cancellationToken)
        {
            await this.fileRepository.DeleteAsync(request.FileName);
            return true;
        }
    }
}

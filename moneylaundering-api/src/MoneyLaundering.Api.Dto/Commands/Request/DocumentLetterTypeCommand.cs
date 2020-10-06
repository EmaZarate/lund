using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
	public class DocumentLetterTypeCommand : IRequest<bool>
	{
		public string Description { get; set; }
	}
}

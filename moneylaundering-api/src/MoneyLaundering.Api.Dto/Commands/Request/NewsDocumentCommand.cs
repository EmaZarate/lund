using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
	public class NewsDocumentCommand : IRequest<bool>
	{
		public string ContactAddress { get; set; }
		public int ContactLocationId { get; set; }
		public int ContactZipCode { get; set; }
		public int DocumentLetterTypeId { get; set; }
		public int NewsId { get; set; }
		public bool Processed { get; set; }
	}
}

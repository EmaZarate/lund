using MediatR;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class DocumentIdQuery : IRequest<bool>
    {
        public DocumentIdQuery(int id)
        {
            this.ID = id;
        }
        public int ID { get; set; }
    }
}

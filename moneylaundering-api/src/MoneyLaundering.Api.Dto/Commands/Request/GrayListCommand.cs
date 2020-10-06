using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class GrayListCommand : IRequest<bool>
    {
        public int PersonId { get; set; }
        public string Comments { get; set; }
        public List<int?> DocumentId { get; set; }
    }
}

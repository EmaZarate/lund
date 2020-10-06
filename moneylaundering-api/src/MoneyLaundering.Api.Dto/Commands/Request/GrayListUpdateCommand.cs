using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class GrayListUpdateCommand : IRequest<bool>
    {
        public int GrayListId { get; set; }
        public string Comments { get; set; }
        public List<int> DocumentId { get; set; }
    }
}

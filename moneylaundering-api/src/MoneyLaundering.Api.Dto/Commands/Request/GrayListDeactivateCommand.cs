using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class GrayListDeactivateCommand : IRequest<bool>
    {
        public bool Active { get; set; }
        public int GrayListId { get; set; }
    }
}

using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
    public class AddPeopleGroupCommand : IRequest<bool>
    {
        public int IdGroupPerson { get; set; }
        public int?[] IdsPeopleAdded { get; set; }
    }
}

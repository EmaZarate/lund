﻿using MediatR;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Requests
{
    public class MailTypeQuery : IRequest<IEnumerable<MailTypeQueryResponse>>
    {
    }
}

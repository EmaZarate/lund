﻿using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Dto.Queries.Responses;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.GrayList.Handlers
{
    public class GetByIdCommandHandler : IRequestHandler<GrayListByIdQuery, GrayListAndPersonQueryResponse>
    {
        private readonly IGrayListRepository grayListRepository;
        private readonly IMapper _mapper;

        public GetByIdCommandHandler(IGrayListRepository grayListRepository, IMapper mapper)
        {
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<GrayListAndPersonQueryResponse> Handle(GrayListByIdQuery request, CancellationToken cancellationToken)
        {
            var grayList = await this.grayListRepository.GetByGrayListId(request.Id);
            var result = this._mapper.Map<GrayListAndPersonQueryResponse>(grayList);

            return result;
        }
    }
}

using AutoMapper;
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

namespace MoneyLaundering.Api.Services.Activity.Handlers
{
    public class GetAllCommandHandler: IRequestHandler<ActivityQuery, IEnumerable<ActivityQueryResponse>>
    {
        private readonly IActivityRepository _activityRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IActivityRepository activityRepository, IMapper mapper)
        {
            this._activityRepository = activityRepository ?? throw new ArgumentNullException(nameof(activityRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<ActivityQueryResponse>> Handle(ActivityQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._activityRepository.GetAll();

            if (resp.Count() == 0)
                throw new NoActionException(Crosscutting.Globalization.Message.ActivityNotFound);

            var result = this._mapper.Map<IEnumerable<ActivityQueryResponse>>(resp);
            return result;
        }
    }
}

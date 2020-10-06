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

namespace MoneyLaundering.Api.Services.Person.Handlers
{
    public class GetAllCommandHandler : IRequestHandler<PersonQuery, PagedResultsQueryResponse<PersonQueryResponse>>
    {
        private readonly IPersonRepository _personRepository;
        private readonly IMapper _mapper;

        public GetAllCommandHandler(IPersonRepository personRepository, IMapper mapper)
        {
            this._personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<PagedResultsQueryResponse<PersonQueryResponse>> Handle(PersonQuery request, CancellationToken cancellationToken)
        {
            var resp = await this._personRepository.GetPagedResults(request.pagination.ActualPage,
                                                                    request.pagination.ItemsPerPage,
                                                                    request.pagination.OrderBy,
                                                                    request.pagination.Ascending,
                                                                    x => (
                                                                        (request.cuit == null || request.cuit.Trim() == "" || x.Cuit.Contains(request.cuit))
                                                                             && (request.fullName == null || request.fullName.Trim() == "" || (x.FirstName + " " + x.LastName).ToLower().Contains(request.fullName.ToLower()))
                                                                             && (request.group ? x.Group : true)
                                                                             && (request.getWithoutGrouping ? (!x.Group && x.GroupCode == null) : true)
                                                                             && (request.groupCode != 0 ? (x.GroupCode == request.groupCode) : true)
                                                                             // By default it returns all the persons that are active unless explicitly received false //
                                                                             && (request.active != null ? (x.Active == request.active) : x.Active == true)
                                                                             && (x.PersonBusinessUnits.Any(
                                                                                            j => ((request.riskId == null || request.riskId == 0 || j.RiskId == request.riskId)
                                                                                                    && (request.tranBefore == null || request.tranBefore.Trim() == "" || j.FinancialProfile >= Convert.ToInt32(request.tranBefore))
                                                                                                    && (request.tranAfter == null || request.tranAfter.Trim() == "" || j.FinancialProfile <= Convert.ToInt32(request.tranAfter))
                                                                                                    && (request.businessUnitId == null || request.businessUnitId == 0 || j.BusinessUnitId == request.businessUnitId)
                                                                                                  ))
                                                                             )
                                                                        )
                                                                    );

            var result = this._mapper.Map<PagedResultsQueryResponse<PersonQueryResponse>>(resp);

            return result;
        }
    }
}

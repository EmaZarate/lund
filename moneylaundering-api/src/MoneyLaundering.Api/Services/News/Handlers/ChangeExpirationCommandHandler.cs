using AutoMapper;
using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;


namespace MoneyLaundering.Api.Services.News.Handlers
{
    public class ChangeExpirationCommandHandler : IRequestHandler<ChangeExpirationCommand, bool>
    {
        private readonly INewsRepository _newsRepository;
        private readonly INewsTypeRepository _newsTypeRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly ICaseRepository _caseRepository;
        private readonly IMapper _mapper;


        public ChangeExpirationCommandHandler(INewsRepository newsRepository, INewsTypeRepository newsTypeRepository,
                                              IStatusRepository statusRepository, ICaseRepository caseRepository, IMapper mapper)
        {
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._newsTypeRepository = newsTypeRepository ?? throw new ArgumentNullException(nameof(newsTypeRepository));
            this._statusRepository = statusRepository ?? throw new ArgumentNullException(nameof(statusRepository));
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<bool> Handle(ChangeExpirationCommand request, CancellationToken cancellationToken)
        {

            DateTime date = DateTime.Now;
            var caseResult = await this._caseRepository.GetAsync(request.CaseID);
            caseResult.ChangeUpdateFile(request.UpdateFile);
            caseResult.ChangeContactInfo(request.Email, request.Address, request.ZipCode, request.ProvinceName, request.CityName, request.StateId);

            var statusID = caseResult.StatusId;
            var newTypeID = Crosscutting.Identifiers.NewsType.CambioVencimiento;
            if (caseResult.ActualStageId != null)
            {
                var lastNews = caseResult.News.FirstOrDefault(m => m.Id == caseResult.ActualStageId);
                if (lastNews != null) lastNews.SetEndDate(date);
            }

            caseResult.AddNews(date, request.ExpirationDate, request.Comments, request.NewsReasonTypeId, newTypeID, statusID);
            caseResult.StatusId = statusID;
            var newsToSaveResult = await this._caseRepository.SaveAsync();

            if (!newsToSaveResult)
                throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);

            return true;
        }
    }

  
}

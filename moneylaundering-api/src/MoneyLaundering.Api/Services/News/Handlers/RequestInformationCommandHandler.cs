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
    public class RequestInformationCommandHandler : IRequestHandler<RequestInformationCaseCommand, bool>
    {
        private readonly INewsRepository _newsRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly ICaseRepository _caseRepository;

        public RequestInformationCommandHandler(INewsRepository newsRepository,
                                                IStatusRepository statusRepository, 
                                                ICaseRepository caseRepository)
        {
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._statusRepository = statusRepository ?? throw new ArgumentNullException(nameof(statusRepository));
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
        }
        public async Task<bool> Handle(RequestInformationCaseCommand request, CancellationToken cancellationToken)
        {
            DateTime date = DateTime.Now;
            var caseResult = await this._caseRepository.GetAsync(request.CaseID);
            var statusID = Crosscutting.Identifiers.Status.InformacionRecibida;
            var newTypeID = Crosscutting.Identifiers.NewsType.ReciboInformacion;

            caseResult.ChangeState(statusID);
            caseResult.ChangeUpdateFile(request.UpdateFile);
            caseResult.ChangeContactInfo(request.Email, request.Address, request.ZipCode, request.ProvinceName, request.CityName, request.StateId);

            if (caseResult.ActualStageId != null)
            {
                var lastNews = caseResult.News.FirstOrDefault(m => m.Id == caseResult.ActualStageId);
                if (lastNews != null) lastNews.SetEndDate(date);
            }

            double DefaultExpiration = Convert.ToDouble(caseResult.Status.DefaultExpiration);
            DateTime ExpirationDate = date.AddDays(DefaultExpiration);

            caseResult.AddNews(date, ExpirationDate, request.Comments, null, newTypeID, statusID);

            var newsToSaveResult = await this._caseRepository.SaveAsync();

            if (!newsToSaveResult)
                throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);

            return true;
        }
    }
}

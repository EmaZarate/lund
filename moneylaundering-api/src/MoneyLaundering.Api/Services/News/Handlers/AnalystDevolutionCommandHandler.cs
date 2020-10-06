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
    public class AnalystDevolutionCommandHandler : IRequestHandler<AnalystDevolutionCommand, bool>
    {
        private readonly INewsRepository newsRepository;
        private readonly IStatusRepository statusRepository;
        private readonly ICaseRepository caseRepository;

        public AnalystDevolutionCommandHandler(INewsRepository newsRepository,
                                                 IStatusRepository statusRepository,
                                                 ICaseRepository caseRepository)
        {
            this.newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this.statusRepository = statusRepository ?? throw new ArgumentNullException(nameof(statusRepository));
            this.caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
        }
        public async Task<bool> Handle(AnalystDevolutionCommand request, CancellationToken cancellationToken)
        {
            DateTime date = DateTime.Now;
            var caseResult = await this.caseRepository.GetAsync(request.CaseId);
            var statusID = Crosscutting.Identifiers.Status.AnalistaAsignado;
            var newTypeID = Crosscutting.Identifiers.NewsType.Devolución;

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

            caseResult.AddNews(date, ExpirationDate, request.Comments, request.NewsReasonTypeId, newTypeID, statusID);

            var newsToSaveResult = await this.caseRepository.SaveAsync();

            if (!newsToSaveResult)
                throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);

            return true;
        }
    }
}

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
    public class FakePossitiveCommandHandler : IRequestHandler<FakePossitiveCommand, bool>
    {
        private readonly ICaseRepository caseRepository;



        public FakePossitiveCommandHandler(ICaseRepository caseRepository)
        {
            this.caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
        }

        public async Task<bool> Handle(FakePossitiveCommand request, CancellationToken cancellationToken)
        {
            DateTime date = DateTime.Now;
            var caseResult = await this.caseRepository.GetAsync(request.CaseID);
            var statusID = Crosscutting.Identifiers.Status.FalsoPositivo;
            var newTypeID = Crosscutting.Identifiers.NewsType.FalsoPositivo;

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
            caseResult.StatusId = statusID;

            var newsToSaveResult = await this.caseRepository.SaveAsync();

            if (!newsToSaveResult)
                throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);

            return true;
        }
    }


}

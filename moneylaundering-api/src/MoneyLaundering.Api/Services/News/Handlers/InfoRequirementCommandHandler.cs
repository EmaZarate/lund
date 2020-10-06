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
    public class InfoRequirementCommandHandler : IRequestHandler<InfoRequirementCommand, bool>
    {
        private readonly INewsRepository _newsRepository;
        private readonly IStatusRepository _statusRepository;
        private readonly ICaseRepository _caseRepository;
        private readonly INewsMailRepository _newsMailRepository;
        private readonly INewsDocumentRepository _newsDocumentRepository;

        public InfoRequirementCommandHandler (INewsRepository newsRepository,
                                              IStatusRepository statusRepository, 
                                              ICaseRepository caseRepository,
                                              INewsMailRepository newsMailRepository,
                                              INewsDocumentRepository newsDocumentRepository
                                              )
        {
            this._newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this._statusRepository = statusRepository ?? throw new ArgumentNullException(nameof(statusRepository));
            this._caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this._newsMailRepository = newsMailRepository ?? throw new ArgumentNullException(nameof(newsMailRepository));
            this._newsDocumentRepository = newsDocumentRepository ?? throw new ArgumentNullException(nameof(newsDocumentRepository));
        }
        public async Task<bool> Handle(InfoRequirementCommand request, CancellationToken cancellationToken)
        {
            DateTime date = DateTime.Now;
            var caseResult = await this._caseRepository.GetAsync(request.CaseID);
            var statusID = Crosscutting.Identifiers.Status.InformacionRecibida;
            var newTypeID = Crosscutting.Identifiers.NewsType.RequerimientoDeInformación;

            caseResult.ChangeState(statusID);
            caseResult.ChangeUpdateFile(request.UpdateFile);
            caseResult.ChangeContactInfo(request.ContactMail, request.Address, request.ZipCode, request.ProvinceName, request.CityName, request.StateId);

            if (caseResult.ActualStageId != null)
            {
                var lastNews = caseResult.News.FirstOrDefault(m => m.Id == caseResult.ActualStageId);
                if (lastNews != null) lastNews.SetEndDate(date);
            }

            double DefaultExpiration = Convert.ToDouble(caseResult.Status.DefaultExpiration);
            DateTime ExpirationDate = date.AddDays(DefaultExpiration);
            caseResult.AddNews(date, ExpirationDate, request.Comments, null, newTypeID, statusID);
            var newsId = this._caseRepository.GetLastNewsId(request.CaseID);

            if (request.NewsFlag == Crosscutting.Constants.NewsFlagType.Mail)
            {
                var newsMailCommand = new NewsMailCommand();
                newsMailCommand.BusinessUnitId = request.BusinessUnitID;
                newsMailCommand.CaseId = request.CaseID;
                newsMailCommand.ContactMail = request.ContactMail;
                newsMailCommand.MailTypeId = request.MailTypeId;
                newsMailCommand.Message = request.Message;
                newsMailCommand.NewsId = newsId;
                newsMailCommand.Subject = request.Subject;
                await this._newsMailRepository.Add(newsMailCommand);
            }

            if (request.NewsFlag == Crosscutting.Constants.NewsFlagType.Document)
            {
                var newsDocumentCommand = new NewsDocumentCommand();
                newsDocumentCommand.ContactAddress = request.ContactAddress;
                newsDocumentCommand.ContactLocationId = request.ContactLocationId;
                newsDocumentCommand.ContactZipCode = request.ContactZipCode;
                newsDocumentCommand.DocumentLetterTypeId = request.DocumentLetterTypeId;
                newsDocumentCommand.NewsId = newsId;
                newsDocumentCommand.Processed = request.Processed;
                await this._newsDocumentRepository.Add(newsDocumentCommand);
            }

            var newsToSaveResult = await this._caseRepository.SaveAsync();
            if (!newsToSaveResult)
                throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);
            return true;
        }
    }
}

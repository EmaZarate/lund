using MediatR;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.News.Handlers
{
    public class AnalystAssignmentCommandHandler : IRequestHandler<AnalystAssignmentCommand, bool>
    {
        private readonly INewsRepository newsRepository;
        private readonly IStatusRepository statusRepository;
        private readonly ICaseRepository caseRepository;

        public AnalystAssignmentCommandHandler(INewsRepository newsRepository,
                                               IStatusRepository statusRepository,
                                               ICaseRepository caseRepository)
        {
            this.newsRepository = newsRepository ?? throw new ArgumentNullException(nameof(newsRepository));
            this.statusRepository = statusRepository ?? throw new ArgumentNullException(nameof(statusRepository));
            this.caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
        }
        public async Task<bool> Handle(AnalystAssignmentCommand requestArray, CancellationToken cancellationToken)
        {
            var countIn = 0;
            var countOut = 0;
            var newsTypeId = Crosscutting.Identifiers.NewsType.AsignaciónAnalista;
            var statusId = Crosscutting.Identifiers.Status.AnalistaAsignado;
            DateTime date = DateTime.Now;

            foreach (var request in requestArray.newItem)
            {
                countIn++;
                var caseResult = await this.caseRepository.GetById(request.CaseId, request.BusinessUnitId);
                caseResult.ChangeState(Crosscutting.Identifiers.Status.AnalistaAsignado);
                caseResult.ChangeAnalyst(request.AnalystId);

                if (caseResult.ActualStageId != null)
                {
                    var lastNews = caseResult.News.FirstOrDefault(m => m.Id == caseResult.ActualStageId);
                    if (lastNews != null) lastNews.SetEndDate(date);
                }

                //var status = await this.statusRepository.GetStatusById(Crosscutting.Identifiers.Status.AnalistaAsignado);

                //var newsToSave = new Domain.Entities.News
                //{
                //    BusinessUnitId = request.BusinessUnitId,
                //    CaseId = request.CaseId,
                //    StatusId = Crosscutting.Identifiers.Status.AnalistaAsignado,
                //    CreateDate = date,
                //    NewsTypeId = Crosscutting.Identifiers.NewsType.AsignaciónAnalista,
                //    Comments = null,
                //    NewsReasonTypeId = null
                //};

                //if (status.DefaultExpiration != null)
                //    newsToSave.ExpirationDate = date.AddDays((int)status.DefaultExpiration);

                //this.newsRepository.Add(newsToSave);

                double DefaultExpiration = Convert.ToDouble(caseResult.Status.DefaultExpiration);
                DateTime ExpirationDate = date.AddDays(DefaultExpiration);

                caseResult.AddNews(date, ExpirationDate, null, null, newsTypeId, statusId);

                var newsToSaveResult = await this.caseRepository.SaveAsync();
                if (!newsToSaveResult)
                    throw new NoActionException(Crosscutting.Globalization.Message.CantRegisterNews);
                else countOut++;
                
            }

            if (countOut == countIn) { return true; }
            else { return false; }
                
        }
    }
}

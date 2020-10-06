using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Identity.Api.Sdk.Lib;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Repositories.Interfaces;
using Roles = Identity.Api.Sdk.Lib.Roles;

namespace MoneyLaundering.Api.Repositories
{
    public class CaseRepository : Repository<Case>, ICaseRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IUserSession userSession;
    
        public CaseRepository(DataContext dbContext, IMapper mapper, IUserSession userSession) : base(dbContext,mapper)
        {
            this.userSession = userSession ?? throw new ArgumentNullException(nameof(userSession));
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }
        public async Task<Case> GetById(int caseNumber, int businessUnitId)
        {
            List<CaseDocument> nonConfidentialDocs = new List<CaseDocument>();
            var cases = await this._dbContext.Cases
               .Where(x => x.CaseNumber == caseNumber &&
                           x.BusinessUnitId == businessUnitId
                      )
               .FirstOrDefaultAsync();

            if (!userSession.Roles.Contains("Higher") && !userSession.Roles.Contains("ComplianceOfficer"))
            {
                foreach (var eachCaseDocument in cases.CaseDocuments)
                {
                    if (!eachCaseDocument.Document.Confidential)
                    {
                        nonConfidentialDocs.Add(eachCaseDocument);

                    }
                }

                cases.CaseDocuments = nonConfidentialDocs;
            }

            return cases;
        }
        public async Task<IEnumerable<Case>> GetAll(CaseQuery request)
        {
            var cases = await this._dbContext.Cases
                        .Include(x => x.BusinessUnit)
                        .Include(x => x.BranchOffice)
                        .Include(x => x.CaseType)
                        .Include(x => x.Status)
                        .Include(x => x.Person)
                        .Include(x => x.Risk)
                        .Include(x => x.CaseType)
                        .Where(x =>

                        ((!String.IsNullOrWhiteSpace(request.Firstname) ? x.Person.FirstName.Contains(request.Firstname) : true)
                        &&
                        (!String.IsNullOrWhiteSpace(request.Surname) ? x.Person.LastName.Contains(request.Surname) : true)
                        &&
                        (!String.IsNullOrWhiteSpace(request.Cuit) ? x.Person.Cuit == request.Cuit : true)
                        &&
                        (request.NumberCase != 0 ? x.CaseNumber == request.NumberCase : true)
                        &&
                        (request.Analist != null ? x.AnalystId == request.Analist : true)
                            &&
                        (request.Risks.Length != 0 ? request.Risks.Contains(x.RiskId) : true)
                        &&
                        (request.CaseTypes.Length != 0 ? request.CaseTypes.Contains(x.CaseTypeId) : true)
                        &&
                        (request.Statuses.Length != 0 ? request.Statuses.Contains(x.StatusId) : true)
                        &&
                        (request.businessUnitId != 0 ? request.businessUnitId==x.BusinessUnitId : true))

                        ).ToListAsync();

            var result = this._mapper.Map<List<Case>>(cases);
            return result;
        }
        public async Task<IEnumerable<Case>> GetCaseByDocumentID(int DocumentID)
        {
            var casesDocument = await this._dbContext.CaseDocument.Where(x => x.DocumentId == DocumentID).Include(x => x.Case).ToListAsync();
            List<Case> listCases = new List<Case>();
            foreach (CaseDocument item in casesDocument)
                listCases.Add(item.Case);
            var result = this._mapper.Map<List<Case>>(listCases);
            return result;
        }
        public async Task<bool> UpdateCase(Case entity)
        {
            this._dbContext.Entry(entity).State = EntityState.Modified;
            this._dbContext.Entry(entity).Property(x => x.ActualStageId).IsModified = false;
            var res = await this._dbContext.SaveChangesAsync();
            if (res > 0)
                return true;
            return false;
        }
        public async Task<bool> SaveAsync()
        {
            var res = await this._dbContext.SaveChangesAsync();

            if (res > 0)
                return true;
            return false;
        }
        public async Task<List<Case>> GetByPeopleIds(int?[] peopleIds)
        {
            var cases = await this._dbContext.Cases.Where(x => peopleIds.Contains(x.PersonId)).ToListAsync();
            return cases;
        }
        public void UpdateRangeOriginalPersonIdAndPersonID(List<Case> cases)
        {
            foreach (var caseItem in cases)
            {
                _dbContext.Entry(caseItem).Property(x => x.OriginalPersonId).IsModified = true;
                _dbContext.Entry(caseItem).Property(x => x.PersonId).IsModified = true;
            }
        }
        public int GetLastNewsId(int CaseId)
        {
            var LastNewID = this._dbContext.News.Where(x => x.CaseId == CaseId).Select(x => x.Id).Max();
            return LastNewID;
        }

        public async Task<Case> GetByNewsId(string newId)
        {
            var news = this._dbContext.News.Where(x => x.Id == Convert.ToInt32(newId)).Select(x => x.CaseId).ToList();
            var resp = await this._dbContext.Cases.Where(x => news.Contains(x.Id)).FirstOrDefaultAsync();
            return resp;
        }
    }
}

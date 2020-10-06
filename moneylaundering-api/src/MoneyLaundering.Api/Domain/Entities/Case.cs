using MoneyLaundering.Api.Domain.Entities.Base;
using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Domain.Entities
{
    public class Case : Entity
    {
        public Case()
        {
            this.News = new List<News>();
            this.CaseDocuments = new List<CaseDocument>();
        }
        public virtual int BusinessUnitId { get; set; }
        public virtual BusinessUnit BusinessUnit { get; set; }
        public virtual int BranchOfficeId { get; set; }
        public virtual BranchOffice BranchOffice { get; set; }
        public virtual int CaseTypeId { get; set; }
        public virtual CaseType CaseType { get; set; }
        public virtual int CaseNumber { get; set; }
        public virtual int? ActualStageId { get; set; }
        public virtual int StatusId { get; set; }
        public virtual Status Status { get; set; }
        public virtual int RiskId { get; set; }
        public virtual Risk Risk { get; set; }
        public virtual string AnalystId { get; set; }
        public virtual User Analyst { get; set; }
        public virtual DateTime CreateDate { get; set; }
        public virtual string Comment { get; set; }
        public virtual bool? UpdateFile { get; set; }
        public virtual string ContactMail { get; set; }
        public virtual string ContactAddress { get; set; }
        public virtual string ContactCity { get; set; }
        public virtual string ContactProvince { get; set; }
        public virtual int? ContactZipCode { get; set; }
        public virtual int? ContactStateId { get; set; }
        public virtual int? ProducerId { get; set; }
        public virtual Producer Producer { get; set; }
        public virtual int? PersonId { get; set; }
        public virtual Person Person { get; set; }
        public virtual int? OriginalPersonId { get; set; }
        public virtual int? Value { get; set; }
        public virtual ICollection<CaseDocument> CaseDocuments { get; set; }
        public virtual ICollection<News> News { get; set; }
        public void ChangeState(int statusId)
        {
            this.StatusId = statusId;
        }

        public void ChangeAnalyst(string AnalystId)
        {
            this.AnalystId = AnalystId;
        }

        public void ChangeUpdateFile(bool? UpdateFile)
        {
            this.UpdateFile = UpdateFile;
        }

        public void ChangeContactInfo(string Email, string Address, int? ZipCode, string ProvinceName, string CityName, int? StateId)
        {
            this.ContactMail = Email;
            this.ContactAddress = Address;
            this.ContactZipCode = ZipCode;
            this.ContactProvince = ProvinceName;
            this.ContactCity = CityName;
            this.ContactStateId = StateId;
        }

        public void AddNews(DateTime date, DateTime? expirationDate, string comments, int? newsReasonTypeId, int newsTypeId, int statusID)
        {
            var entity = new News
            {
                BusinessUnitId = this.BusinessUnitId,
                CaseId = this.Id,
                StatusId = statusID,
                CreateDate = date,
                NewsTypeId = newsTypeId,
                Comments = comments,
                NewsReasonTypeId = newsReasonTypeId
            };

            if (expirationDate != null)
            {
                entity.ExpirationDate = expirationDate;
            }
            else
            {
                entity.ExpirationDate = null;
            }
            this.News.Add(entity);
        }
    }
}

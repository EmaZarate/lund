using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MoneyLaundering.Api.Dto.Commands.Request;

namespace MoneyLaundering.Api.Repositories
{
    public class NewsMailRepository : Repository<NewsMail>, INewsMailRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public NewsMailRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<NewsMail> GetByCaseId(int id)
        {
            var resp = await this._dbContext.NewsMail
                        .FirstOrDefaultAsync(x => x.Id == id);

            var respMapped = this._mapper.Map<NewsMail>(resp);
            return respMapped;
        }

        public async Task<NewsMail> GetByNewsId(int id)
        {
            var resp = await this._dbContext.NewsMail
                        .FirstOrDefaultAsync(x => x.NewsId == id);

            var respMapped = this._mapper.Map<NewsMail>(resp);
            return respMapped;
        }

        public async Task<bool> Add(NewsMailCommand s)
        {
            var respMapped = new NewsMail();
            respMapped.CaseId = s.CaseId;
            respMapped.NewsId = s.NewsId;
            respMapped.BusinessUnitId = s.BusinessUnitId;
            respMapped.ContactMail = s.ContactMail;
            respMapped.MailTypeId = s.MailTypeId;
            respMapped.Subject = s.Subject;
            respMapped.Message = s.Message;
            this._dbContext.NewsMail.Add(respMapped);
            return true;
        }
    }
}

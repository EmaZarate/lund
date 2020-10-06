using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class GrayListRepository : Repository<GrayList>, IGrayListRepository
    {
        private readonly DataContext _dbContext;
        private readonly IMapper _mapper;

        public GrayListRepository(DataContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<List<GrayList>> GetByPeopleIds(int?[] peopleIds)
        {
            var grayList = await this._dbContext.GrayList.Where(x => peopleIds.Contains(x.PersonId)).ToListAsync();
            return grayList;
        }

        public async Task<IEnumerable<GrayList>> GetAll(GrayListQuery request)
        {
            var grayList = await this._dbContext.GrayList
                                     .Include(x => x.Person)
                                     .Where(x => 
                                            (request.Active != null ? (x.Active == request.Active) : true) && 

                                            ((request.Cuit == null || 
                                            request.Cuit.Trim() == "" || 
                                            x.Person.Cuit.Contains(request.Cuit))) && 

                                            ((
                                            request.FullName == null ||
                                            request.FullName.Trim() == "" ||
                                            (x.Person.FirstName + " " + x.Person.LastName).ToLower().Contains(request.FullName))))
                                     .OrderByDescending(x => x.CreationDate)
                                     .ToListAsync();

            return grayList;   

        }

        public async Task<GrayList> AddNew(GrayListCommand command)
        {
            var grayList = new GrayList();
            var newGrayList = grayList.AddGrayList(command.PersonId, command.Comments);
            var entity = _dbContext.GrayList.Add(newGrayList).Entity;
            var saving = await SaveAsync();

            if (saving)
                return entity;
            else
                throw new NoActionException(Crosscutting.Globalization.Message.GrayListPersonNotSaved);
        }

        public async Task<GrayList> GetById(int PersonId)
        {
            var grayListItem = await _dbContext.GrayList.Where(x => x.PersonId == PersonId).FirstOrDefaultAsync();

            return grayListItem;
        }

        public async Task<GrayList> GetByGrayListId(int GrayListId)
        {
            var grayListItem = await _dbContext.GrayList.Where(x => x.Id == GrayListId).FirstOrDefaultAsync();
            return grayListItem;
        }

        public async Task AddDocument(int GrayListId, List<int> DocumentIds)
        {
            var grayListDocument = new GrayListDocument();
            var newGrayListDocument = grayListDocument.AddGrayListDocument(GrayListId, DocumentIds);
            foreach(var documents in newGrayListDocument)
            {
                _dbContext.GrayListDocument.Add(documents);
            }

            return;
        }

        public async Task<IEnumerable<GrayListDocument>> GetDocumentById(int GrayListId)
        {
            var grayListDocument = await _dbContext.GrayListDocument
                                                    .Include(x => x.Document)
                                                    .Where(x => x.GrayListId == GrayListId)
                                                    .ToListAsync();
            return grayListDocument;
        }

        public async Task<bool> SaveAsync()
        {
            var res = await this._dbContext.SaveChangesAsync();

            if (res > 0)
                return true;
            return false;
        }

        public async Task<bool> DeleteAsync(GrayList entity)
        {
            _dbContext.GrayList.Remove(entity);
            var saving = await SaveAsync();
            
            if (saving)
                return true;
            else
                throw new NoActionException(Crosscutting.Globalization.Message.GrayListDocumentNotSaved);
        }
    }
}

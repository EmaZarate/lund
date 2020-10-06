using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DataContext _dbContext;
        private readonly IPersonRepository personRepository;
        private readonly ICaseRepository caseRepository;
        private readonly IDocumentRepository documentRepository;
        private readonly IGrayListRepository grayListRepository;
        private readonly IPersonBusinessUnitRepository personBusinessUnitRepository;

        public GroupRepository(
            DataContext dbContext,
            IPersonRepository personRepository,
            ICaseRepository caseRepository,
            IDocumentRepository documentRepository,
            IGrayListRepository grayListRepository,
            IPersonBusinessUnitRepository personBusinessUnitRepository)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this.personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this.documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            this.grayListRepository = grayListRepository ?? throw new ArgumentNullException(nameof(grayListRepository));
            this.personBusinessUnitRepository = personBusinessUnitRepository ?? throw new ArgumentNullException(nameof(personBusinessUnitRepository));
        }

        public async Task<bool> SaveGroup(List<Person> peopleToSave, List<Case> casesToSave, List<Document> documentToSave, List<GrayList> grayListToSave,List<PersonBusinessUnit> personBusinessUnitAdded)
        {
            await this.personRepository.Update(peopleToSave);
            this.caseRepository.UpdateRangeOriginalPersonIdAndPersonID(casesToSave);
            await this.documentRepository.Update(documentToSave);
            await this.grayListRepository.Update(grayListToSave);
            await this.personBusinessUnitRepository.Update(personBusinessUnitAdded);
            await this._dbContext.SaveChangesAsync();
            return true;
        }
    }
}

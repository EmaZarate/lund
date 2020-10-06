using MediatR;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MoneyLaundering.Api.Services.Group.Handlers
{
    public class AddPeopleGroupCommandHandler : IRequestHandler<AddPeopleGroupCommand, bool>
    {
        private readonly IPersonRepository personRepository;
        private readonly ICaseRepository caseRepository;
        private readonly IDocumentRepository documentRepository;
        private readonly IGrayListRepository grayListRepositoty;
        private readonly IGroupRepository groupRepository;
        private readonly IPersonBusinessUnitRepository personBusinessUnitRepository;
        public AddPeopleGroupCommandHandler(
            IPersonRepository personRepository,
            ICaseRepository caseRepository,
            IDocumentRepository documentRepository,
            IGrayListRepository grayListRepositoty,
            IGroupRepository groupRepository,
            IPersonBusinessUnitRepository personBusinessUnitRepository
            )
        {
            this.personRepository = personRepository ?? throw new ArgumentNullException(nameof(personRepository));
            this.caseRepository = caseRepository ?? throw new ArgumentNullException(nameof(caseRepository));
            this.documentRepository = documentRepository ?? throw new ArgumentNullException(nameof(documentRepository));
            this.grayListRepositoty = grayListRepositoty ?? throw new ArgumentNullException(nameof(grayListRepositoty));
            this.groupRepository = groupRepository ?? throw new ArgumentNullException(nameof(groupRepository));
            this.personBusinessUnitRepository = personBusinessUnitRepository ?? throw new ArgumentNullException(nameof(personBusinessUnitRepository));
        }
        public async Task<bool> Handle(AddPeopleGroupCommand request, CancellationToken cancellationToken)
        {
            List<Domain.Entities.Person> peopleToSave = new List<Domain.Entities.Person>();
            List<Domain.Entities.PersonBusinessUnit> personBusinessUnitAdded = new List<Domain.Entities.PersonBusinessUnit>();
            var personGroup = await this.personRepository.GetAsync(request.IdGroupPerson);
            var peopleAddes = await this.personRepository.GetAsync(request.IdsPeopleAdded);
            personGroup.Group = true;
            var cases = await this.caseRepository.GetByPeopleIds(request.IdsPeopleAdded);
            var documents = await this.documentRepository.GetByPeopleIds(request.IdsPeopleAdded);
            var grayList = await this.grayListRepositoty.GetByPeopleIds(request.IdsPeopleAdded);
            var personBusinessUnitPeopleAdded = await this.personBusinessUnitRepository.GetByPeopleIds(request.IdsPeopleAdded);
            foreach (var people in peopleAddes)
            {
                people.GroupCode = personGroup.Id;
            }
            foreach (var caseItem in cases)
            {
                caseItem.OriginalPersonId = caseItem.PersonId;
                caseItem.PersonId = personGroup.Id;
            }
            foreach (var document in documents)
            {
                document.PersonOrignalId = document.PersonId;
                document.PersonId = personGroup.Id;
            }
            foreach (var grayListItem in grayList)
            {
                grayListItem.PersonOriginalId = grayListItem.PersonId;
                grayListItem.PersonId = personGroup.Id;
            }
            foreach (var personBusinessUnitPersonAdded in personBusinessUnitPeopleAdded)
            {
                bool save = true;
                foreach (var businessUnitPersonGroup in personGroup.PersonBusinessUnits)
                {
                    if (businessUnitPersonGroup.BusinessUnitId == personBusinessUnitPersonAdded.BusinessUnitId)
                    {
                        save = false;
                    }
                }
                if (save)
                {
                    PersonBusinessUnit personBusinessUnit = new PersonBusinessUnit()
                    {
                        PersonId = personGroup.Id,
                        BusinessUnitId = personBusinessUnitPersonAdded.BusinessUnitId,
                        FinancialProfile = personBusinessUnitPersonAdded.FinancialProfile,
                        CalcRisk = personBusinessUnitPersonAdded.CalcRisk,
                        AssignedRisk = personBusinessUnitPersonAdded.AssignedRisk,
                        RiskId = personBusinessUnitPersonAdded.RiskId,

                    };
                    personBusinessUnitAdded.Add(personBusinessUnit);
                }
            }

            peopleToSave.AddRange(peopleAddes);
            peopleToSave.Add(personGroup);
            await this.groupRepository.SaveGroup(peopleToSave, cases, documents, grayList, personBusinessUnitAdded);
            return true;
        }
    }
}

using AutoMapper;
using MoneyLaundering.Api.Domain.Entities;
using MoneyLaundering.Api.Dto.Commands.Request;
using MoneyLaundering.Api.Dto.Queries.Responses;
using System.Linq;

namespace MoneyLaundering.Api.Mapper.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<CaseDocument, CaseDocumentQueryResponse>()
                .ForMember(s => s.Document, opt => opt.MapFrom(s => s.Document));

            CreateMap<PersonBusinessUnit, PersonBusinessUnitQueryResponse>()
                .ForMember(s => s.Person, opt => opt.MapFrom(s => s.Person))
                .ForMember(s => s.Risk, opt => opt.MapFrom(s => s.Risk))
                .ForMember(s => s.BusinessUnit, opt => opt.MapFrom(s => s.BusinessUnit));

            CreateMap<Case, CaseQueryResponse>()
                .ForMember(d => d.News, opt => opt.Ignore())
                .ForMember(d => d.NewsList, opt => opt.MapFrom(d => d.News))
                .ForMember(d => d.BusinessUnit, opt => opt.MapFrom(d => d.BusinessUnit))
                .ForMember(d => d.CaseType, opt => opt.MapFrom(d => d.CaseType))
                .ForMember(d => d.Risk, opt => opt.MapFrom(d => d.Risk))
                .ForMember(d => d.Person, opt => opt.MapFrom(d => d.Person))
                .ForMember(d => d.BranchOffice, opt => opt.MapFrom(d => d.BranchOffice))
                .ForMember(d => d.CaseDocuments, opt => opt.MapFrom(d => d.CaseDocuments))
                .ForMember(d => d.Status, opt => opt.MapFrom(d => d.Status));

            CreateMap<Document, DocumentQueryResponse>()
                .ForMember(d => d.DocumentTypeDescription, opt => opt.MapFrom(d => d.DocumentType.Description))
                .ForMember(d => d.DocumentId, opt => opt.MapFrom(d => d.Id))
                .ForMember(d => d.VersionId, opt => opt.MapFrom(d => d.DocumentVersions.OrderByDescending(x => x.VersionId).FirstOrDefault().VersionId))
                .ForMember(d => d.CreateDate, opt => opt.MapFrom(d => d.DocumentVersions.OrderByDescending(x => x.VersionId).FirstOrDefault().CreateDate))
                .ForMember(d => d.Expiration, opt => opt.MapFrom(d => d.DocumentVersions.OrderByDescending(x => x.VersionId).FirstOrDefault().Expiration))
                .ForMember(d => d.Comment, opt => opt.MapFrom(d => d.DocumentVersions.OrderByDescending(x => x.VersionId).FirstOrDefault().Comment))
                .ForMember(d => d.PhysicalName, opt => opt.MapFrom(d => d.DocumentVersions.OrderByDescending(x => x.VersionId).FirstOrDefault().PhysicalName));

            CreateMap<News, NewsQueryResponse>()
                .ForMember(d => d.Id, opt => opt.MapFrom(c => c.Id))
                .ForMember(d => d.NewsTypeDescription, opt => opt.MapFrom(c => c.NewsType.Description))
                .ForMember(d => d.StatusDescription, opt => opt.MapFrom(c => c.Status.Description));

            CreateMap<State, StateQueryResponse>()
                .ForMember(s => s.StateId, opt => opt.MapFrom(s => s.Id));

            CreateMap<Location, LocationQueryResponse>()
                .ForMember(l => l.LocationId, opt => opt.MapFrom(l => l.Id));

            CreateMap<NewsReason, NewsReasonQueryResponse>()
                .ForMember(l => l.Description, opt => opt.MapFrom(l => l.NewsReasonType.Description))
                .ForMember(l => l.Global, opt => opt.MapFrom(l => l.NewsReasonType.Global))
                .ForMember(l => l.NewsReasonTypeId, opt => opt.MapFrom(l => l.NewsReasonType.Id));

            CreateMap<NewsReasonType, NewsReasonQueryResponse>()
                .ForMember(l => l.NewsReasonTypeId, opt => opt.MapFrom(l => l.Id));

            CreateMap<BusinessUnit, BusinessUnitQueryResponse>()
                .ForMember(s => s.Producers, opt => opt.MapFrom(s => s.Producers))
                .ForMember(s => s.PersonBusinessUnits, opt => opt.Ignore());

            CreateMap<Person, PersonQueryResponse>().IgnoreAllPropertiesWithAnInaccessibleSetter()
                .ForMember(l => l.PersonBusinessUnits, opt => opt.MapFrom(l => l.PersonBusinessUnits))
                .ForMember(l => l.Location, opt => opt.MapFrom(l => l.Location))
                .ForMember(l => l.GrayLists, opt => opt.MapFrom(l => l.GrayLists));

            CreateMap<UploadDocumentCommand, Document>().IgnoreAllPropertiesWithAnInaccessibleSetter()
                .ForMember(l => l.DocumentVersions, opt => opt.Ignore())
                .ForMember(l => l.DocumentType, opt => opt.Ignore());

            CreateMap<CaseDocumentCommand, CaseDocument>()
                .ForMember(s => s.Document, opt => opt.Ignore())
                .ForMember(s => s.Case, opt => opt.Ignore());




        }
    }
}

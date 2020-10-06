using AutoMapper;
using Moq;

namespace MoneyLaundering.Api.Tests.Unit.Services
{
    public class ServiceTest
    {
        protected Mock<IMapper> mapperMock = new Mock<IMapper>();
        protected System.Threading.CancellationToken cancellationtoken = new System.Threading.CancellationToken();
    }
}

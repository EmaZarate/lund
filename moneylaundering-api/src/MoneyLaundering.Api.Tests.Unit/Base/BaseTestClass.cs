using MediatR;
using Moq;

namespace MoneyLaundering.Api.Tests.Unit.Base
{
    public abstract class BaseTestClass<T>
           where T : class
    {
        public T Sut { get; set; }
        public Mock<IMediator> MediatorMock { get; set; }
    }
}

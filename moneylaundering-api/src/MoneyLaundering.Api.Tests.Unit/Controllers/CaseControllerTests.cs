using MediatR;
using MoneyLaundering.Api.Controllers;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Tests.Unit.Base;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace MoneyLaundering.Api.Tests.Unit.Controllers
{
    public class CaseControllerTests : BaseTestClass<CaseController>
    {
        public CaseControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();
            this.Sut = new CaseController(this.MediatorMock.Object);
        }

        public class TheContructor : CaseControllerTests
        {
            [Fact]
            public void Should_throw_an_ArgumentNullException_When_Mediator_Is_Null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new CaseController(mediator));
            }
        }

        public class TheGetMethod : CaseControllerTests
        {
            CaseQuery CaseQuery { get; set; }

            public TheGetMethod()
            {
                this.CaseQuery = new CaseQuery();
            }

            [Fact]
            public async Task Should_Send_Query_To_Mediator_For_Dispatching()
            {
                //Arrange

                //Act
                await this.Sut.Get(CaseQuery);
                //Assert
                this.MediatorMock.Verify(mdt => mdt.Send(It.IsAny<CaseQuery>(), CancellationToken.None), Times.AtMostOnce());
            }
        }
    }
}

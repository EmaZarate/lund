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
    public class CaseTypeControllerTests: BaseTestClass<CaseTypeController>
    {

        public CaseTypeControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();

            this.Sut = new CaseTypeController(this.MediatorMock.Object);
        }
        public class TheConstructor : CaseTypeControllerTests
        {
            [Fact]

            public void Should_throw_an_ArgumentNullException_when_mediator_is_null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new CaseTypeController(mediator));

            }
        }

        public class TheGetMethod : CaseTypeControllerTests
        {
            CaseTypeQuery CaseTypeQuery { get; set; }

            public TheGetMethod()
            {
                this.CaseTypeQuery = new CaseTypeQuery();
            }

            [Fact]

            public async Task Should_send_query_to_mediator_for_dispatching()
            {
                // arrange

                //act

                await this.Sut.Get(CaseTypeQuery);

                //assert
                this.MediatorMock.Verify(
                    mdt => mdt.Send(It.IsAny<CaseTypeQuery>(), CancellationToken.None),
                    Times.Once()
                    );
            }
        }
    }

}

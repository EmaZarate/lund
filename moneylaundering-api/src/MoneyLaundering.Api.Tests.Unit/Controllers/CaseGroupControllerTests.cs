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
    public class CaseGroupControllerTests : BaseTestClass<CaseGroupController>
    {
        public CaseGroupControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();

            this.Sut = new CaseGroupController(this.MediatorMock.Object);
        }

        public class TheConstructor : CaseGroupControllerTests
        {
            [Fact]

            public void Should_throw_an_ArgumentNullException_when_mediator_is_null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new CaseGroupController(mediator));
            }
        }

        public class TheGetMethod : CaseGroupControllerTests
        {
            CaseGroupQuery CaseGroupQuery { get; set; }

            public TheGetMethod()
            {
                this.CaseGroupQuery = new CaseGroupQuery();
            }

            [Fact]

            public async Task Should_send_query_to_mediator_for_dispatching()
            {
                // arrange

                //act

                await this.Sut.Get(CaseGroupQuery);

                //assert
                this.MediatorMock.Verify(
                    mdt => mdt.Send(It.IsAny<CaseGroupQuery>(), CancellationToken.None),
                    Times.Once()
                    );
            }
        }
    }
    

}

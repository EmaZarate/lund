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
    public class StateControllerTests : BaseTestClass<StatusController>
    {

        public StateControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();

            this.Sut = new StatusController(this.MediatorMock.Object);
        }

        public class TheConstructor: StateControllerTests
        {
            [Fact]

            public void Should_throw_an_ArgumentNullException_when_mediator_is_null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new StatusController(mediator));
            
            }
        }

        public class TheGetMethod : StateControllerTests
        {
            StatusQuery StatusQuery { get; set; }

            public TheGetMethod()
            {
                this.StatusQuery = new StatusQuery();
            }

            [Fact]

            public async Task Should_send_query_to_mediator_for_dispatching()
            {
                // arrange

                //act

                await this.Sut.Get(StatusQuery);

                //assert
                this.MediatorMock.Verify(
                    mdt => mdt.Send(It.IsAny<StatusQuery>(), CancellationToken.None),
                    Times.Once()
                    );
            }
            
        }
    }
}

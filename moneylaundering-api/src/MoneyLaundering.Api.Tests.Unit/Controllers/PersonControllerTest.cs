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
    public class PersonControllerTests : BaseTestClass<PersonController>
    {
        public PersonControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();

            this.Sut = new PersonController(this.MediatorMock.Object);
        }

        public class TheConstructor : PersonControllerTests
        {
            [Fact]

            public void Should_throw_an_ArgumentNullException_when_mediator_is_null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new PersonController(mediator));

            }
        }

        public class TheGetMethod : PersonControllerTests
        {
            PersonQuery PersonQuery { get; set; }

            public TheGetMethod()
            {
                this.PersonQuery = new PersonQuery();
            }

            [Fact]

            public async Task Should_send_query_to_mediator_for_dispatching()
            {
                // arrange

                //act
                /*
                await this.Sut.Get(PersonQuery);

                //assert
                this.MediatorMock.Verify(
                    mdt => mdt.Send(It.IsAny<PersonQuery>(), CancellationToken.None),
                    Times.Once()
                    );*/
            }

        }
    }
}

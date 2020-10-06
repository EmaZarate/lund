using MediatR;
using MoneyLaundering.Api.Controllers;
using MoneyLaundering.Api.Dto.Queries.Requests;
using MoneyLaundering.Api.Tests.Unit.Base;
using Moq;
using System;
using Xunit;

namespace MoneyLaundering.Api.Tests.Unit.Controllers
{
    public class BusinessUnitControllerTests : BaseTestClass<BusinessUnitController>
    {
        public BusinessUnitControllerTests()
        {
            this.MediatorMock = new Mock<IMediator>();
            this.Sut = new BusinessUnitController(this.MediatorMock.Object);
        }

        public class TheContructor : CaseControllerTests
        {
            [Fact]
            public void Should_throw_an_ArgumentNullException_When_Mediator_Is_Null()
            {
                IMediator mediator = null;
                Assert.Throws<ArgumentNullException>(nameof(mediator), () => new BusinessUnitController(mediator));
            }
        }

        public class TheGetMethod : CaseControllerTests
        {
            BusinessUnitQuery BusinessUnitQuery { get; set; }

            public TheGetMethod()
            {
                this.BusinessUnitQuery = new BusinessUnitQuery();
            }
        }
    }
}

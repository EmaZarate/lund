using System;

using MediatR;
using Xunit;

using MoneyLaundering.Api.Controllers.Base;

namespace MoneyLaundering.Api.Tests.Unit.Controllers.Base
{
    public class BaseControllerTests
    {
        private class BaseControllerTestClass : BaseController
        {
            public BaseControllerTestClass(IMediator mediator) : base(mediator) { }
        }

        public class TheConstructor : BaseControllerTests
        {
            [Fact]
            public void Should_throw_ArgumentNullException_when_mediator_provided_is_null()
            {
                // Arrange

                // Act & Assert
                Assert.Throws<ArgumentNullException>(() => new BaseControllerTestClass(null));
            }
        }
    }
}

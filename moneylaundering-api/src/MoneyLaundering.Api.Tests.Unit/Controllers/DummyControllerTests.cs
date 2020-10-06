using System;

using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

using MoneyLaundering.Api.Controllers;
using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Tests.Unit.Base;
using MoneyLaundering.Api.Services;

namespace MoneyLaundering.Api.Tests.Unit.Controllers
{
    public class DummyControllerTests : BaseTestClass<DummyController>
    {
        protected IDummyService DummyService { get; set; }

        public DummyControllerTests()
        {
            this.DummyService = Mock.Of<IDummyService>();

            this.Sut = new DummyController(this.DummyService);
        }

        public class TheConstructor : DummyControllerTests
        {
            [Fact]
            public void Should_throw_ArgumentNullException_when_dummyService_is_null()
            {
                // Arrange
                this.DummyService = null;

                // Act & Assert
                Assert.Throws<ArgumentNullException>(() => new DummyController(this.DummyService));
            }
        }

        public class TheMethod_GetDummyAsync : DummyControllerTests
        {
            [Fact]
            public async void Should_return_an_OkObjectResult()
            {
                // Arrange

                // Act
                var result = await this.Sut.GetDummyAsync();

                // Assert
                Assert.IsType<OkObjectResult>(result);
            }

            [Fact]
            public async void Should_get_the_data_from_the_dummyService()
            {
                // Arrange

                // Act
                await this.Sut.GetDummyAsync();

                // Assert
                Mock.Get(this.DummyService).Verify(s => s.GetDummyAsync(), Times.Once);
            }
        }

        public class TheMethod_Exception : DummyControllerTests
        {
            [Fact]
            public void Should_throw_an_ValidationException()
            {
                // Arrange

                // Act & Assert
                Assert.Throws<ValidationException>(() => this.Sut.Exception());
            }
        }
    }
}

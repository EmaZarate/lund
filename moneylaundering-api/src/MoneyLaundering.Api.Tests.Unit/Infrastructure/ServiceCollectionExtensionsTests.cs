using Microsoft.Extensions.DependencyInjection;
using Xunit;

using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Tests.Unit.Infrastructure
{
    public interface ITestClass { }
    public class TestClass : ITestClass { }

    public class ServiceCollectionExtensionsTests
    {
        public class TheMethod_RegisterAssemblyPublicNonGenericClasses : ServiceCollectionExtensionsTests
        {
            [Fact]
            public void Should_register_public_classes()
            {
                // Arrange
                var service = new ServiceCollection();

                // Act
                var result = service.RegisterAssemblyPublicNonGenericClasses();

                // Assert
                Assert.Contains(typeof(TestClass), result.TypesToConsider);
            }
        }

        public class TheMethod_AsPublicImplementedInterfaces : ServiceCollectionExtensionsTests
        {
            [Fact]
            public void Should_register_implemented_interfaces()
            {
                // Arrange
                var service = new ServiceCollection();

                // Act
                service.RegisterAssemblyPublicNonGenericClasses().AsPublicImplementedInterfaces();

                // Assert
                Assert.Single(service);
            }
        }
    }
}

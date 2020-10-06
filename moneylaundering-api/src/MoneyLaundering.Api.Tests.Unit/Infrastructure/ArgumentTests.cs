using System;

using Xunit;

using MoneyLaundering.Api.Infrastructure;

namespace MoneyLaundering.Api.Tests.Unit.Infrastructure
{
    public class ArgumentTests
    {
        public class TheMethod_ThrowIfNull
        {
            [Fact]
            public void Should_throw_an_ArgumentNullException_when_the_object_is_null()
            {
                // Arrange
                string obj = null;
                string paramName = "paramName";

                // Act & Assert
                Assert.Throws<ArgumentNullException>(paramName, () => Argument.ThrowIfNull(obj, paramName));
            }
        }
    }
}

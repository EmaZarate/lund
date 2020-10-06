using System;

using Xunit;

using MoneyLaundering.Api.Exceptions;

namespace MoneyLaundering.Api.Tests.Unit.Exceptions
{
    public class InvalidUserTokenExceptionTests
    {
        public class TheConstructor : InvalidUserTokenExceptionTests
        {
            [Fact]
            public void Should_initialize_exception_message()
            {
                // Arrange
                var message = "This is a message";

                // Act
                var exception = new InvalidUserTokenException(message);

                // Assert
                Assert.Equal(message, exception.Message);
            }

            [Fact]
            public void Should_initialize_exception_message_and_inner_exception()
            {
                // Arrange
                var message = "This is a message";
                var exceptionMessage = "Exception message!";
                var innerException = new Exception(exceptionMessage);

                // Act
                var exception = new InvalidUserTokenException(message, innerException);

                // Assert
                Assert.Equal(message, exception.Message);
                Assert.Equal(innerException, exception.InnerException);
            }
        }
    }
}

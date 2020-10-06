using System;
using System.Collections.Generic;

using FluentValidation.Results;
using Xunit;

using MoneyLaundering.Api.Exceptions;

namespace MoneyLaundering.Api.Tests.Unit.Exceptions
{
    public class ValidationExceptionTests
    {
        public class TheConstructor : ValidationExceptionTests
        {
            [Fact]
            public void Should_initialize_failures()
            {
                // Arrange

                // Act
                var exception = new ValidationException();

                // Assert
                Assert.Empty(exception.Failures);
            }

            [Fact]
            public void Should_initialize_exception_message()
            {
                // Arrange
                var message = "This is a message";

                // Act
                var exception = new ValidationException(message);

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
                var exception = new ValidationException(message, innerException);

                // Assert
                Assert.Equal(message, exception.Message);
                Assert.Equal(innerException, exception.InnerException);
            }

            [Fact]
            public void Should_add_a_single_failure_with_two_messages()
            {
                // Arrange
                var key = "Id";
                var failures = new List<ValidationFailure>
                {
                    new ValidationFailure(key, "Not found"),
                    new ValidationFailure(key, "Does not exists")
                };

                // Act
                var exception = new ValidationException(failures);

                // Assert
                Assert.Single(exception.Failures);
                Assert.Equal(2, exception.Failures[key].Length);
            }

            [Fact]
            public void Should_add_two_failures()
            {
                // Arrange
                var key1 = "Id";
                var key2 = "Name";
                var failures = new List<ValidationFailure>
                {
                    new ValidationFailure(key1, "Not found"),
                    new ValidationFailure(key1, "Does not exists"),
                    new ValidationFailure(key2, "Not found"),
                    new ValidationFailure(key2, "Does not exists")
                };

                // Act
                var exception = new ValidationException(failures);

                // Assert
                Assert.Equal(2, exception.Failures.Count);
            }
        }
    }
}

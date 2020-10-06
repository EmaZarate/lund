using System;
using System.Collections.Generic;
using System.Net;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Xunit;

using MoneyLaundering.Api.Exceptions;
using MoneyLaundering.Api.Filters;
using MoneyLaundering.Api.Tests.Unit.Base;

namespace MoneyLaundering.Api.Tests.Unit.Filters
{
    public class CustomExceptionFilterAttributeTests : BaseTestClass<CustomExceptionFilterAttribute>
    {
        public CustomExceptionFilterAttributeTests()
        {
            this.Sut = new CustomExceptionFilterAttribute();
        }

        public class TheMethod_OnException : CustomExceptionFilterAttributeTests
        {
            private ActionContext GetActionContext()
            {
                return new ActionContext
                {
                    HttpContext = new DefaultHttpContext(),
                    RouteData = new RouteData(),
                    ActionDescriptor = new ActionDescriptor(),
                };
            }

            [Fact]
            public void Should_return_a_BadRequest_when_an_ValidationException_occurs()
            {
                // Arrange
                var context = this.GetActionContext();
                var exceptionContext = new ExceptionContext(context, new List<IFilterMetadata>())
                {
                    Exception = new ValidationException()
                };

                // Act
                this.Sut.OnException(exceptionContext);

                // Assert
                Assert.Equal((int)HttpStatusCode.BadRequest, context.HttpContext.Response.StatusCode);
            }

            [Fact]
            public void Should_return_an_InternalServerError_when_an_Exception_occurs()
            {
                // Arrange
                var context = this.GetActionContext();
                var exceptionContext = new ExceptionContext(context, new List<IFilterMetadata>())
                {
                    Exception = new Exception()
                };

                // Act
                this.Sut.OnException(exceptionContext);

                // Assert
                Assert.Equal((int)HttpStatusCode.InternalServerError, context.HttpContext.Response.StatusCode);
            }

            [Fact]
            public void Should_return_a_BadRequest_when_an_InvalidUserTokenException_occurs()
            {
                // Arrange
                var context = this.GetActionContext();
                var exceptionContext = new ExceptionContext(context, new List<IFilterMetadata>())
                {
                    Exception = new InvalidUserTokenException()
                };

                // Act
                this.Sut.OnException(exceptionContext);

                // Assert
                Assert.Equal((int)HttpStatusCode.BadRequest, context.HttpContext.Response.StatusCode);
            }
        }
    }
}

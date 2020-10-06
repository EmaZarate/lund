using System;
using System.Collections.Generic;
using System.Net;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using MoneyLaundering.Api.Exceptions;

namespace MoneyLaundering.Api.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var code = HttpStatusCode.InternalServerError;

            Dictionary<Type, HttpStatusCode> exceptionHttpStatusCodes = new Dictionary<Type, HttpStatusCode>
            {
                { typeof(DocumentInGrayListException), HttpStatusCode.BadRequest },
                { typeof(DocumentInMultipleCasesException), HttpStatusCode.BadRequest },
                { typeof(DocumentNotFoundException), HttpStatusCode.BadRequest },
                { typeof(InvalidUserTokenException), HttpStatusCode.BadRequest },
                { typeof(LocationsWithStateIdDoNotExist), HttpStatusCode.BadRequest },
                { typeof(NoActionException), HttpStatusCode.BadRequest },
                { typeof(NoDocumentResultsWithPersonId), HttpStatusCode.BadRequest },
                { typeof(StatesAreNotFound), HttpStatusCode.BadRequest },
            };

            IActionResult result = new JsonResult(new
            {
                error = new[] { context.Exception.Message },
                stackTrace = context.Exception.StackTrace
            });

            if (context.Exception is ValidationException validationException)
            {
                result = new JsonResult(validationException.Failures);
                code = HttpStatusCode.BadRequest;
            }
            else if (exceptionHttpStatusCodes.ContainsKey(context.Exception.GetType()))
            {
                code = exceptionHttpStatusCodes[context.Exception.GetType()];
            }

            context.HttpContext.Response.ContentType = "application/json";
            context.HttpContext.Response.StatusCode = (int)code;
            context.Result = result;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

using FluentValidation.Results;

namespace MoneyLaundering.Api.Exceptions
{
    [Serializable]
    public class ValidationException : Exception
    {
        public IDictionary<string, string[]> Failures { get; }

        public ValidationException() : base()
        {
            this.Failures = new Dictionary<string, string[]>();
        }
        public ValidationException(string message) : base(message) { }
        public ValidationException(string message, Exception inner) : base(message, inner) { }
        protected ValidationException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public ValidationException(List<ValidationFailure> failures) : this()
        {
            var propertyNames = failures.Select(e => e.PropertyName).Distinct();

            foreach (var propertyName in propertyNames)
            {
                var propertyErrors = failures.Where(e => e.PropertyName == propertyName)
                                             .Select(e => e.ErrorMessage)
                                             .ToArray();

                this.Failures.Add(propertyName, propertyErrors);
            }
        }

    }
}

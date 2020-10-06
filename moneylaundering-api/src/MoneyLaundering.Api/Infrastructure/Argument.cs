using System;

namespace MoneyLaundering.Api.Infrastructure
{
    public static class Argument
    {
        public static void ThrowIfNull(object obj, string paramName)
        {
            if (obj == null)
            {
                throw new ArgumentNullException(paramName);
            }
        }
    }
}

using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Infrastructure
{
    public static class ConfigurationExtensions
    {
        public static string GetKeyVaultConfig(this IConfiguration configuration, string principalConfig, params string[] subConfigs)
        {
            var principalConfigValue = configuration[principalConfig];

            var subConfigValues = new List<string>();
            foreach (var subConfig in subConfigs)
            {
                var subConfigKeyVaultKey = configuration[subConfig];
                subConfigValues.Add(configuration[subConfigKeyVaultKey]);
            }

            return string.Format(principalConfigValue, subConfigValues.ToArray());
        }
    }
}

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MoneyLaundering.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                   .UseApplicationInsights()
                   .UseStartup<Startup>()
                   .ConfigureAppConfiguration((webHostBuilderContext, configurationBuilder) =>
                            {
                                configurationBuilder.SetBasePath(webHostBuilderContext.HostingEnvironment.ContentRootPath)
                                                    .AddJsonFile($"appsettings.{webHostBuilderContext.HostingEnvironment.EnvironmentName}.json", false)
                                                    .AddEnvironmentVariables();

                                var config = configurationBuilder.Build();

                                configurationBuilder.AddAzureKeyVault(
                                    $"https://{config["KeyVault:Name"]}.vault.azure.net/",
                                    config["KeyVault:AppId"],
                                    config["KeyVault:AppSecret"]
                                );
                            })
                   .ConfigureLogging(logging =>
                   {
                       logging.ClearProviders();
                       logging.AddApplicationInsights();
                   });
    }
}

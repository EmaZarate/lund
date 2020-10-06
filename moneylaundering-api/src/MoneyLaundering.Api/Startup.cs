using System.Net.Http;
using System.Reflection;

using AutoMapper;
using FluentValidation.AspNetCore;
using MediatR;
using MediatR.Pipeline;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using MoneyLaundering.Api.Data.Ef;
using MoneyLaundering.Api.Filters;
using MoneyLaundering.Api.Infrastructure;
using MoneyLaundering.Api.Swagger;
using MoneyLaundering.Api.Repositories;

namespace MoneyLaundering.Api
{
    public class Startup
    {
        private readonly IConfiguration configuration;
        private readonly IWebHostEnvironment environment;
        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Argument.ThrowIfNull(configuration, nameof(configuration));
            Argument.ThrowIfNull(environment, nameof(environment));

            this.environment = environment;
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", true)
                .AddEnvironmentVariables();

            this.configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddIdentityV3(this.configuration);
            services.AddSwagger();

            // Add MediatR
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPreProcessorBehavior<,>));
            services.AddMediatR(typeof(Startup).Assembly);

            services.AddContextDb(configuration);

            // Factory: AutoMapper
            services.AddAutoMapper(typeof(Startup));

            // Factory: Clients
            services.AddScoped<HttpClient>();

            // Factory: AutoRegistered Interfaces.
            services.RegisterAssemblyPublicNonGenericClasses()
                    .AsPublicImplementedInterfaces();

            //Repositories
            services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
            // Add FluentValidation
            services.AddMvc(options => options.Filters.Add(typeof(CustomExceptionFilterAttribute)))
                    .AddFluentValidation(fvc => fvc.RegisterValidatorsFromAssemblyContaining<Startup>());

            // Add Insights
            services.AddApplicationInsightsTelemetry();

        }


        public void Configure(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(opt =>
            {
                string url = $"/swagger/v1/swagger.json";

                if (!this.environment.IsDevelopment())
                    url = string.Concat("/portalproveedoresapi", url);

                string name = $"{Assembly.GetExecutingAssembly().GetName().Name} - v1";

                opt.SwaggerEndpoint(url, name);
                opt.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseEndpoints(config =>
            {
                config.MapControllers();
            });
        }

    }
}

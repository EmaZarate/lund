using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Identity.Api.Sdk.Lib;
namespace MoneyLaundering.Api.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddIdentityV3(this IServiceCollection services, IConfiguration configuration)
        {
            //Configuration
            var secret = configuration.GetSection("JwtOptions:Secret");
            services.Configure<JwtOptions>(m => configuration.GetSection("JwtOptions"));
            services.AddScoped<IJwtFactory, JwtFactory>();

            //Session
            services.AddScoped<IUserSession, UserSession>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //Policies
            services
                .AddMvcCore(opt =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .RequireAuthenticatedUser()
                        .Build();

                    opt.Filters.Add(new AuthorizeFilter(policy));
                })
                .AddApiExplorer()
                .AddDataAnnotations()
                .AddAuthorization();

            services.AddCors();

            //Authentication Configurations
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret.Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            return services;

        }

        public static AutoRegisterData RegisterAssemblyPublicNonGenericClasses(this IServiceCollection services, params Assembly[] assemblies)
        {
            if (assemblies.Length == 0)
            {
                assemblies = new[] { Assembly.GetCallingAssembly() };
            }

            var allPublicTypes = assemblies.SelectMany(x => x.GetExportedTypes().Where(y => y.IsClass && !y.IsAbstract && !y.IsGenericType && !y.IsNested));

            return new AutoRegisterData(services, allPublicTypes);
        }

        public static IServiceCollection AsPublicImplementedInterfaces(this AutoRegisterData autoRegData, ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            Argument.ThrowIfNull(autoRegData, nameof(autoRegData));

            foreach (var classType in autoRegData.TypesToConsider)
            {
                var interfaces = classType.GetTypeInfo().ImplementedInterfaces.Where(i => i != typeof(IDisposable) && i.IsPublic && !i.IsNested);
                foreach (var infc in interfaces)
                {
                    autoRegData.Services.Add(new ServiceDescriptor(infc, classType, lifetime));
                }
            }

            return autoRegData.Services;
        }
    }

    public class AutoRegisterData
    {
        public IServiceCollection Services { get; }
        public IEnumerable<Type> TypesToConsider { get; }

        public AutoRegisterData(IServiceCollection services, IEnumerable<Type> typesToConsider)
        {
            Argument.ThrowIfNull(services, nameof(services));
            Argument.ThrowIfNull(typesToConsider, nameof(typesToConsider));

            this.Services = services;
            this.TypesToConsider = typesToConsider;
        }
    }
}

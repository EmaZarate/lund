using System;
using System.IO;
using System.Reflection;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

namespace MoneyLaundering.Api.Swagger
{
    public static class DefaultDI
    {

        /// <summary>
        /// Adds Swagger.
        /// </summary>
        /// <param name="services">The services.</param>
        /// <returns></returns>
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(opt =>
            {
                opt.DescribeAllParametersInCamelCase();

                opt.SwaggerDoc("v1", new OpenApiInfo()
                {
                    Title = Assembly.GetEntryAssembly().GetName().Name,
                    Version = "v1"
                });

                string apiXmlFile = $"{Assembly.GetEntryAssembly().GetName().Name}.xml";
                string apiXmlPath = Path.Combine(AppContext.BaseDirectory, apiXmlFile);
                opt.IncludeXmlComments(apiXmlPath);

                string dtosXmlFile = $"{Assembly.GetEntryAssembly().GetName().Name}.Dto.xml";
                string dtosXmlPath = Path.Combine(AppContext.BaseDirectory, dtosXmlFile);
                opt.IncludeXmlComments(dtosXmlPath);

                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    In = ParameterLocation.Header,
                    Name = HeaderNames.Authorization,
                    Scheme = "Bearer",
                    Type = SecuritySchemeType.ApiKey
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            return services;
        }
    }
}

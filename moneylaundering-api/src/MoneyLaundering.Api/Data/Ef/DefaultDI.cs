using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MoneyLaundering.Api.Data.Ef
{
    public static class DefaultDI
    {
        public static IServiceCollection AddContextDb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt =>
                opt.EnableSensitiveDataLogging()
                   .UseLazyLoadingProxies()
                   .UseSqlServer(configuration.GetConnectionString("DataContext")));

            return services;
        }
    }
}

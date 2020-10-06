using MoneyLaundering.Api.Dto.Commands.Request;
 using MoneyLaundering.Api.Dto.Queries.Responses;
 using System.Collections.Generic;
 using System.Threading.Tasks;
 
 namespace MoneyLaundering.Api.Repositories.Interfaces
 {
     public interface IAlertRecoveryRepository
     {
         Task<bool> AlertRecoveryUpdate(AlertRecoveryCommand entity);
     }
 }

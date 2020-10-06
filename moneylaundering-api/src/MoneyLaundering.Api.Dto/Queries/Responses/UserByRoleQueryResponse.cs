using System;
using System.Collections.Generic;
using System.Text;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class UserByRoleQueryResponse
    {
        public string RoleId { get; set; }
        public virtual string UserId { get; set; }
 
    }
}

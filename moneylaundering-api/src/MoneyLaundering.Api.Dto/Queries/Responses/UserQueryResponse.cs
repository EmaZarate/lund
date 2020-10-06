using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class UserQueryResponse
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserId { get; set; }
        public string OfficialIdType { get; set; }
        public string CuitCuil { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MoneyLaundering.Api.Dto.Queries.Responses
{
    public class VehicleQueryResponse
    {
		public string LicensePlate { get; set; }
		public string Make { get; set; }
		public string Model { get; set; }
		public string Version { get; set; }
		public short? Year { get; set; }
	}
}

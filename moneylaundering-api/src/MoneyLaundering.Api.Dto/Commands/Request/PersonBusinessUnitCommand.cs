using MediatR;

namespace MoneyLaundering.Api.Dto.Commands.Request
{
	public class PersonBusinessUnitCommand : IRequest<bool>
	{
		public virtual int Id { get; set; }
		public virtual int FinancialProfile { get; set; }
		public virtual int? AssignedRisk { get; set; }
	}
}

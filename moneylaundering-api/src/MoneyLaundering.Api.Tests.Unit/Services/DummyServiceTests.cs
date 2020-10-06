using System;

using Microsoft.AspNetCore.Hosting;
using Moq;
using Xunit;

using MoneyLaundering.Api.Dto;
using MoneyLaundering.Api.Services;
using MoneyLaundering.Api.Tests.Unit.Base;

namespace MoneyLaundering.Api.Tests.Unit.Services
{
	public class DummyServiceTests : BaseTestClass<DummyService>
	{
		public IWebHostEnvironment HostingEnvironment { get; set; }

		public DummyServiceTests()
		{
			this.HostingEnvironment = Mock.Of<IWebHostEnvironment>();

			this.Sut = new DummyService(this.HostingEnvironment);
		}

		public class TheConstructor : DummyServiceTests
		{
			[Fact]
			public void Should_throw_ArgumentNullException_then_hostingEnvironment_is_null()
			{
				// Arrange
				this.HostingEnvironment = null;

				// Act & Assert
				Assert.Throws<ArgumentNullException>(() => new DummyService(this.HostingEnvironment));
			}
		}

		public class TheMethod_GetDummyAsync : DummyServiceTests
		{
			[Fact]
			public async void Should_return_a_dummyResponse()
			{
				// Arrange

				// Act
				var result = await this.Sut.GetDummyAsync();

				// Assert
				Assert.IsType<DummyResponse>(result);
			}
		}
	}
}

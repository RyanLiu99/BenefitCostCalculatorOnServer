using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EmployeeCostCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalculateCostController : ControllerBase
    {
        private readonly ICostCalculateService costCalculateService;
        private readonly ILogger<CalculateCostController> _logger;

        public CalculateCostController(
            ICostCalculateService costCalculateService,
            ILogger<CalculateCostController> logger)
        {
            this.costCalculateService = costCalculateService;
            _logger = logger;
        }

        [HttpPost]
        public decimal Post(Employee employee)
        {
            return this.costCalculateService.CalculatePayCheckCost(employee);
            
        }
    }
}

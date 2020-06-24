using Entities;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CostServices
{
    public class CostCalculateService : ICostCalculateService
    {
        private readonly IDiscountService discountService;
        private readonly ICostConfiguration costConfiguration;

        public CostCalculateService(
            IDiscountService discountService,
            ICostConfiguration costConfiguration
            )
        {
            this.discountService = discountService;
            this.costConfiguration = costConfiguration;
        }

        public decimal CalculatePayCheckCost(Employee emp)
        {
            var annualCost = this.CalculateAnnualCost(emp);
            return Math.Round(annualCost * 100 / 26) / 100;
        }

        private decimal CalculateAnnualCost(Employee emp)
        {
            var employeeCost = this.discountService.ApplyDiscount(emp.Name,
              this.costConfiguration.EmployeeAnnualCost);

            IEnumerable<string> dependents = emp.Children;
            if (!string.IsNullOrWhiteSpace(emp.SpouseName))
            {
                dependents = emp.Children.Concat(new[] { emp.SpouseName });
            }

            var dependentsCost = this.CalculateDependentsAnnualCost(dependents);
            return employeeCost + dependentsCost;
        }

        private decimal CalculateDependentsAnnualCost(IEnumerable<string> dependents)
        {
            return dependents.Select(d => this.CalculateDependentAnnualCost(d))
              .Aggregate(0m, (p, c) => p + c);
        }

        private decimal CalculateDependentAnnualCost(string name)
        {
            return this.discountService.ApplyDiscount(name, costConfiguration.DependentAnnualCost);
        }
    }
}

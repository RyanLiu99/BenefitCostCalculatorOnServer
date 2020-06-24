using Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CostServices
{
    public class CostConfiguration : ICostConfiguration
    {
        public decimal DependentAnnualCost => 500;

        public decimal EmployeeAnnualCost => 1000;
    }
}

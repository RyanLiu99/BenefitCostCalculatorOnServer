using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces
{
    public interface ICostConfiguration
    {
        public decimal DependentAnnualCost { get; }
        public decimal EmployeeAnnualCost { get; }

        
    }
}

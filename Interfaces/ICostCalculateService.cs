using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces
{
   public interface ICostCalculateService
    {
        decimal CalculatePayCheckCost(Employee emp);
    }
}

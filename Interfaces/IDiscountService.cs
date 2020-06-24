using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces
{
    public interface IDiscountService
    {
        decimal ApplyDiscount(string name, decimal cost);
    }
}

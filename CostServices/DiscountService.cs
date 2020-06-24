using Entities;
using Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace CostServices
{
    public class DiscountService : IDiscountService
    {
        private readonly DiscountRule[] discountRules;

        public DiscountService()
        {
            this.discountRules = new[]{
                new DiscountRule(name => name.StartsWith("A", StringComparison.OrdinalIgnoreCase),
                0.1m)
            };
        }

        public decimal ApplyDiscount(string name, decimal cost)
        {
            var result = cost;
            foreach (var r in this.discountRules)
            {
                result = r.applyDiscount(name, result);
            }

            return result;
        }
    }
}

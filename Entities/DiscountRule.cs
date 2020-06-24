using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class DiscountRule
    {
        private readonly Func<string, bool> condition;
        private readonly decimal discount;

        public DiscountRule(Func<string, bool> condition, decimal discount)
        {
            this.condition = condition;
            this.discount = discount;
        }

        public decimal applyDiscount(string name, decimal cost)
        {

            if (this.condition(name))
            {
                return cost * (1 - this.discount);
            }
            else
            {
                return cost;
            }
        }
    }
}

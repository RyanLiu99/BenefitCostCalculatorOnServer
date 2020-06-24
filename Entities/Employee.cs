using System;
using System.Collections.Generic;

namespace Entities
{
    public class Employee
    {
        public string SpouseName { get; set; }
        public IList<string> Children => new List<string>();
        public int Id { get; set; }
        public string Name { get; set; }

        public Employee()
        {
        }

        public Employee(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }

    }
}

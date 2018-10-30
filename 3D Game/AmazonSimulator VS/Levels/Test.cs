using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Levels
{
    public class Test
    {
        private double _x = 0;
        private double _y = 0;
        private double _z = 0;

        private string _name = null;
        public Test()
        {
            this.A = string.Empty;
            this.B = new int();
            this.C = new int();
        }

        public string A
        {
            get;
            set;
        }

        public int B
        {
            get;
            set;
        }
        public int C
        {
            get;
            set;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Levels
{
    public class Level
    {
        private double _x = 0;
        private double _y = 0;
        private double _z = 0;

        private double _rX = 0;
        private double _rY = 0;
        private double _rZ = 0;

        public double rotationX { get { return _rX; } }
        public double rotationY { get { return _rY; } }
        public double rotationZ { get { return _rZ; } }

        public string type { get; }
        private string name;
        public double x { get { return _x; } }
        public double y { get { return _y; } }
        public double z { get { return _z; } }

        public bool needsUpdate = true;

        public Level(string name, double x, double z)
        {
            this.name = name;
            this.type = "level";

            this._x = x;
            this._y = 0;
            this._z = z;

            this._rX = 0;
            this._rY = 0;
            this._rZ = 0;
        }
    }
}
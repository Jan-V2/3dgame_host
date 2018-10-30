using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Levels
{
    public class Level
    {
        private bool[,] layout;
        private List<Coord> starts = new List<Coord>();
        private List<Coord> ends = new List<Coord>();

        public Level(char[,] level_data)
        {
            layout = new bool[level_data.GetLength(0), level_data.GetLength(1)];
            for (int i = 0; i < level_data.GetLength(0); i++)
            {
                for (int j = 0; j < level_data.GetLength(1); j++)
                {
                    char square = level_data[i, j];
                    if (square == 'l'){
                        layout[i, j] = false;
                    }else if (square == 's'){
                        layout[i, j] = true;
                        starts.Add(new Coord(i,j));
                    }else if (square == 'v'){
                        layout[i, j] = true;
                    }else if (square == 'e'){
                        ends.Add(new Coord(i,j));
                        layout[i, j] = true;
                    }
                }
            }
        }
      
        public string get_json()
        {

            return JsonConvert.SerializeObject(new {
                layout,
                starts,
                ends
            });
        }
    }

    public class Coord
    {
        public int X { get; }
        public int Y { get; }

        public Coord(int x, int y)
        {
            Y = y;
            X = x;
        }
        /*public Level()
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
        }*/

    }
}
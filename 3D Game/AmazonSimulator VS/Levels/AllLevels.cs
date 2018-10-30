using System;
using System.Collections.Generic;
using Controllers;

namespace Levels
{
    public class AllLevels
    {
        public char[,] test_level =
        {
            {'l','l','l','l','l'},
            {'l','s','v','e','l'},
            {'l','l','l','l','l'}
        };

        public static char[,] level_1 = 
        {
                {'v','v','v','l','l','l','l','l','l','l'},
                {'v','b','v','v','v','v','l','l','l','l'},
                {'v','v','v','v','v','v','v','v','v','l'},
                {'l','v','v','v','v','v','v','v','v','v'},
                {'l','l','l','l','l','v','v','e','v','v'},
                {'l','l','l','l','l','l','v','v','v','l'}
        };

        public static char[,] level_2 = 
        {
                {'l','l','l','l','l','l','v','v','v','v','v','v','v','l','l'},
                {'v','v','v','v','l','l','v','v','v','l','l','v','v','l','l'},
                {'v','v','b','v','v','v','v','v','v','l','l','v','v','v','v'},
                {'v','v','v','v','l','l','l','l','l','l','l','v','v','e','v'},
                {'v','v','v','v','l','l','l','l','l','l','l','l','v','v','v'}
        };

        public static char[,] level_3 =  
        {
                {'l','l','l','l','l','v','v','v','v','v','v','l','l','l','l'},
                {'l','l','l','l','l','v','l','l','v','v','v','l','l','l','l'},
                {'l','l','l','l','l','v','l','l','v','v','v','v','v','l','l'},
                {'v','b','v','v','v','v','l','l','l','l','l','v','v','v','v'},
                {'l','l','l','l','v','v','v','l','l','l','l','v','v','e','v'},
                {'l','l','l','l','v','v','v','l','l','l','l','l','v','v','v'},
                {'l','l','l','l','l','l','v','l','l','v','v','l','l','l','l'},
                {'l','l','l','l','l','l','v','v','v','v','v','l','l','l','l'},
                {'l','l','l','l','l','l','v','v','v','v','v','l','l','l','l'},
                {'l','l','l','l','l','l','l','v','v','v','l','l','l','l','l'}
        };

        public static char[,] level_4 = 
        {
                {'l','l','v','v','l','l','v','v','l','l','l'},
                {'l','v','v','v','v','v','v','v','l','l','v'},
                {'l','v','e','v','l','l','l','v','v','v','v'},
                {'l','v','v','v','l','l','l','l','v','v','v'},
                {'l','l','l','l','l','l','l','l','l','v','v'},
                {'l','l','l','l','v','v','v','l','l','v','v'},
                {'v','v','v','v','v','v','v','l','l','v','v'},
                {'v','v','b','v','v','v','v','v','v','v','v'}
        };

    public List<Level> level = new List<Level>();

        /// <summary>
        /// Checks if the list which is used to send the levels to the client is empty or
        /// if there are some variables already in it from a previous level
        /// and resets it to make room for the new level
        /// </summary>
        public void CheckLevelList()
        {
            if (level != null)
            {
                level = new List<Level>();
            }
        }
        /// <summary>
        /// Create level one and adds it to a list
        /// </summary>
        /// <returns>level</returns>

        public void LevelFive()
        {
            throw new NotImplementedException();
        }
    }
}
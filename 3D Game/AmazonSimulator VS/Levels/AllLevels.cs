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
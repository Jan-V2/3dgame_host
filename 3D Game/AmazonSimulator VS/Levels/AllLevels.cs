using System;
using System.Collections.Generic;
using Controllers;

namespace Levels
{
    public class AllLevels
    {
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
        public void LevelOne()
        {
            CheckLevelList();
            Level[] levelone = new Level[34];
            levelone[0] = new Level("plane", 0, 0);
            levelone[1] = new Level("plane1", 0, -5);
            levelone[2] = new Level("plane2", 0, -10);
            levelone[3] = new Level("plane3", 5, 0);
            levelone[4] = new Level("plane4", 5, -5);
            levelone[5] = new Level("plane5", 5, -10);
            levelone[6] = new Level("plane6", 5, -15);
            levelone[7] = new Level("plane7", 5, -20);
            levelone[8] = new Level("plane8", 5, -25);
            levelone[9] = new Level("plane9", 10, 0);
            levelone[10] = new Level("plane10", 10, -5);
            levelone[11] = new Level("plane11", 10, -10);
            levelone[12] = new Level("plane12", 10, -15);
            levelone[13] = new Level("plane13", 10, -20);
            levelone[14] = new Level("plane14", 10, -25);
            levelone[15] = new Level("plane15", 10, -30);
            levelone[16] = new Level("plane16", 10, -35);
            levelone[17] = new Level("plane17", 10, -40);
            levelone[18] = new Level("plane18", 15, -5);
            levelone[19] = new Level("plane19", 15, -10);
            levelone[20] = new Level("plane20", 15, -15);
            levelone[21] = new Level("plane21", 15, -20);
            levelone[22] = new Level("plane22", 15, -25);
            levelone[23] = new Level("plane23", 15, -30);
            levelone[24] = new Level("plane24", 15, -35);
            levelone[25] = new Level("plane25", 15, -35);
            levelone[26] = new Level("plane26", 15, -40);
            levelone[27] = new Level("plane27", 15, -45);
            levelone[28] = new Level("plane28", 20, -25);
            levelone[29] = new Level("plane29", 20, -30);
            levelone[30] = new Level("plane30", 20, -40);
            levelone[31] = new Level("plane31", 20, -45);
            levelone[32] = new Level("plane32", 25, -30);
            levelone[33] = new Level("plane33", 25, -35);
            levelone[34] = new Level("plane34", 25, -40);

            for (int x = 0; x <= levelone.Length; x++)
            {
                level.Add(levelone[x]);
            }

        }
        /// <summary>
        /// Create level two and adds it to a list
        /// </summary>
        /// <returns>level</returns>
        public void LevelTwo()
        {
            CheckLevelList();
            Level[] leveltwo = new Level[42];
            leveltwo[0] = new Level("plane", -5, -30);
            leveltwo[1] = new Level("plane1", -5, -35);
            leveltwo[2] = new Level("plane2", -5, -40);
            leveltwo[3] = new Level("plane3", -5, -45);
            leveltwo[4] = new Level("plane4", -5, -50);
            leveltwo[5] = new Level("plane5", -5, -55);
            leveltwo[6] = new Level("plane6", -5, -60);
            leveltwo[7] = new Level("plane7", 0, 0);
            leveltwo[8] = new Level("plane8", 0, -5);
            leveltwo[9] = new Level("plane9", 0, -10);
            leveltwo[10] = new Level("plane10", 0, -15);
            leveltwo[11] = new Level("plane11", 0, -30);
            leveltwo[12] = new Level("plane12", 0, -35);
            leveltwo[13] = new Level("plane13", 0, -40);
            leveltwo[14] = new Level("plane14", 0, -55);
            leveltwo[15] = new Level("plane15", 0, -60);
            leveltwo[16] = new Level("plane16", 5, 0);
            leveltwo[17] = new Level("plane17", 5, -5);
            leveltwo[18] = new Level("plane18", 5, -10);
            leveltwo[19] = new Level("plane19", 5, -15);
            leveltwo[20] = new Level("plane20", 5, -20);
            leveltwo[21] = new Level("plane21", 5, -25);
            leveltwo[22] = new Level("plane22", 5, -30);
            leveltwo[23] = new Level("plane23", 5, -35);
            leveltwo[24] = new Level("plane24", 5, -40);
            leveltwo[25] = new Level("plane25", 5, -55);
            leveltwo[26] = new Level("plane26", 5, -60);
            leveltwo[27] = new Level("plane27", 5, -65);
            leveltwo[28] = new Level("plane28", 5, -70);
            leveltwo[29] = new Level("plane29", 10, 0);
            leveltwo[30] = new Level("plane30", 10, -5);
            leveltwo[31] = new Level("plane31", 10, -10);
            leveltwo[32] = new Level("plane32", 10, -15);
            leveltwo[33] = new Level("plane33", 10, -55);
            leveltwo[34] = new Level("plane34", 10, -60);
            leveltwo[35] = new Level("plane35", 10, -70);
            leveltwo[36] = new Level("plane36", 15, 0);
            leveltwo[37] = new Level("plane37", 15, -5);
            leveltwo[38] = new Level("plane38", 15, -10);
            leveltwo[39] = new Level("plane39", 15, -15);
            leveltwo[40] = new Level("plane40", 15, -60);
            leveltwo[41] = new Level("plane41", 15, -65);
            leveltwo[42] = new Level("plane42", 15, -70);

            for (int x = 0; x <= leveltwo.Length; x++)
            {
                level.Add(leveltwo[x]);
            }
        }
        /// <summary>
        /// Creates level three and adds it to a list
        /// </summary>
        /// <returns></returns>
        public void LevelThree()
        {
            CheckLevelList();
            Level[] levelthree = new Level[53];
            levelthree[0] = new Level("plane", -15, -25);
            levelthree[1] = new Level("plane1", -15, -30);
            levelthree[2] = new Level("plane2", -15, -35);
            levelthree[3] = new Level("plane3", -15, -40);
            levelthree[4] = new Level("plane4", -15, -45);
            levelthree[5] = new Level("plane5", -15, -50);
            levelthree[6] = new Level("plane6", -10, -25);
            levelthree[7] = new Level("plane7", -10, -40);
            levelthree[8] = new Level("plane8", -10, -45);
            levelthree[9] = new Level("plane9", -10, -50);
            levelthree[10] = new Level("plane10", -5, -25);
            levelthree[11] = new Level("plane11", -5, -40);
            levelthree[12] = new Level("plane12", -5, -45);
            levelthree[13] = new Level("plane13", -5, -50);
            levelthree[14] = new Level("plane14", -5, -55);
            levelthree[15] = new Level("plane15", -5, -60);
            levelthree[16] = new Level("plane16", 0, 0);
            levelthree[17] = new Level("plane17", 0, -5);
            levelthree[18] = new Level("plane18", 0, -10);
            levelthree[19] = new Level("plane19", 0, -15);
            levelthree[20] = new Level("plane20", 0, -20);
            levelthree[21] = new Level("plane21", 0, -25);
            levelthree[22] = new Level("plane22", 0, -55);
            levelthree[23] = new Level("plane23", 0, -60);
            levelthree[24] = new Level("plane24", 0, -65);
            levelthree[25] = new Level("plane25", 0, -70);
            levelthree[26] = new Level("plane26", 5, -20);
            levelthree[27] = new Level("plane27", 5, -25);
            levelthree[28] = new Level("plane28", 5, -30);
            levelthree[29] = new Level("plane29", 5, -55);
            levelthree[30] = new Level("plane30", 5, -60);
            levelthree[31] = new Level("plane31", 5, -70);
            levelthree[32] = new Level("plane32", 10, -20);
            levelthree[33] = new Level("plane33", 10, -25);
            levelthree[34] = new Level("plane34", 10, -30);
            levelthree[35] = new Level("plane35", 10, -60);
            levelthree[36] = new Level("plane36", 10, -65);
            levelthree[37] = new Level("plane37", 10, -70);
            levelthree[38] = new Level("plane38", 15, -30);
            levelthree[39] = new Level("plane39", 15, -45);
            levelthree[40] = new Level("plane40", 15, -50);
            levelthree[41] = new Level("plane41", 20, -30);
            levelthree[42] = new Level("plane42", 20, -35);
            levelthree[43] = new Level("plane43", 20, -40);
            levelthree[44] = new Level("plane44", 20, -45);
            levelthree[45] = new Level("plane45", 20, -50);
            levelthree[46] = new Level("plane46", 25, -30);
            levelthree[47] = new Level("plane47", 25, -35);
            levelthree[48] = new Level("plane48", 25, -40);
            levelthree[49] = new Level("plane49", 25, -45);
            levelthree[50] = new Level("plane50", 25, -50);
            levelthree[51] = new Level("plane51", 30, -35);
            levelthree[52] = new Level("plane52", 30, -40);
            levelthree[53] = new Level("plane53", 30, -45);

            for (int x = 0; x <= levelthree.Length; x++)
            {
                level.Add(levelthree[x]);
            }
        }

        public void LevelFour()
        {
            CheckLevelList();
            Level[] levelfour = new Level[50];
            levelfour[0] = new Level("plane", 0, 0);
            levelfour[1] = new Level("plane1", 0, -5);
            levelfour[2] = new Level("plane2", 0, -10);
            levelfour[3] = new Level("plane3", 0, -15);
            levelfour[4] = new Level("plane4", 0, -20);
            levelfour[5] = new Level("plane5", 0 ,-25);
            levelfour[6] = new Level("plane6", 0, -30);
            levelfour[7] = new Level("plane7", 0, -35);
            levelfour[8] = new Level("plane8", 0, -40);
            levelfour[9] = new Level("plane9", 0 ,-45);
            levelfour[10] = new Level("plane10", 0, -50);
            levelfour[11] = new Level("plane11", -5, 0);
            levelfour[12] = new Level("plane12", -5, -5);
            levelfour[13] = new Level("plane13", -5 ,-10);
            levelfour[14] = new Level("plane14", -5, -15);
            levelfour[15] = new Level("plane15", -5, -20);
            levelfour[16] = new Level("plane16", -5, -25);
            levelfour[17] = new Level("plane17", -5, -30);
            levelfour[18] = new Level("plane18", -5, -45);
            levelfour[19] = new Level("plane19", -5, -50);
            levelfour[20] = new Level("plane20", -10, -20);
            levelfour[21] = new Level("plane21", -10, -25);
            levelfour[22] = new Level("plane22", -10, -30);
            levelfour[23] = new Level("plane23", -10, -45);
            levelfour[24] = new Level("plane24", -10, -50);
            levelfour[25] = new Level("plane25", -15, -45);
            levelfour[26] = new Level("plane26", -15, -50);
            levelfour[27] = new Level("plane27", -20, -5);
            levelfour[28] = new Level("plane28", -20, -10);
            levelfour[29] = new Level("plane29", -20, -15);
            levelfour[30] = new Level("plane30", -20, -40);
            levelfour[31] = new Level("plane31", -20, -45);
            levelfour[32] = new Level("plane32", -20, -50);
            levelfour[33] = new Level("plane33", -25, -5);
            levelfour[34] = new Level("plane34", -25, -15);
            levelfour[35] = new Level("plane35", -25 , -35);
            levelfour[36] = new Level("plane36", -25, -40);
            levelfour[37] = new Level("plane37", -25, -45);
            levelfour[38] = new Level("plane38", -25, -50);
            levelfour[39] = new Level("plane39", -30, -5);
            levelfour[40] = new Level("plane40", -30, -10);
            levelfour[41] = new Level("plane41", -30, -15);
            levelfour[42] = new Level("plane42", -30, -20);
            levelfour[43] = new Level("plane43", -30, -25);
            levelfour[44] = new Level("plane44", -30, -30);
            levelfour[45] = new Level("plane45", -30, -35);
            levelfour[46] = new Level("plane46", -30, -50);
            levelfour[47] = new Level("plane47", -35, -10);
            levelfour[48] = new Level("plane48", -35, -15);
            levelfour[49] = new Level("plane49", -35, -30);
            levelfour[50] = new Level("plane50", -35, -35);

            for (int x = 0; x <= levelfour.Length; x++)
            {
                level.Add(levelfour[x]);
            }
        }

        public void LevelFive()
        {
            throw new NotImplementedException();
        }
    }
}
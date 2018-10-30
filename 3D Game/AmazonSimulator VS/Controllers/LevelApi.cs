using System;
using System.Collections.Generic;
using Levels;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Route("api/[controller]")]
    public class LevelsController: Controller
    {
        // GET api/levels/[level nummer]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            switch (id)
            {
                case 1:
                    Levels.Level level_1 = new Level(AllLevels.level_1);
                    return level_1.get_json();
                case 2:
                    Levels.Level level_2 = new Level(AllLevels.level_2);
                    return level_2.get_json();
                case 3:
                    Levels.Level level_3 = new Level(AllLevels.level_3);
                    return level_3.get_json();
                case 4:
                    Levels.Level level_4 = new Level(AllLevels.level_4);
                    return level_4.get_json();
                case 5:
                    Levels.Level level_5 = new Level(AllLevels.level_5);
                    return level_5.get_json();
            }
            return null;
        }
    }
}
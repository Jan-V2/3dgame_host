using System;
using System.Collections.Generic;
using Levels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Controllers
{
    [Route("api/[controller]")]
    public class LevelsController: Controller
    {

        // GET api/levels/
        [HttpGet]
        public string Get()
        {

            return JsonConvert.SerializeObject(new {
                n_levels = AllLevels.levels.Length
            });
        }

        // GET api/levels/[level nummer]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            Levels.Level level = new Level(AllLevels.levels[id-1]);
            return level.get_json();
        }

    }
}
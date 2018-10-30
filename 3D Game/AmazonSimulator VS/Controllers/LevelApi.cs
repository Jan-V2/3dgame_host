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
            Levels.Level level = new Level(new[,]{
                {'l','l','l','l','l'},
                {'l','s','v','e','l'},
                {'l','l','l','l','l'}
            });
            return level.get_json();
        }
    }
}
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
            Levels.Level level = new Level(new[,] { { 'l', 'l', 'l', 'l', 'l', 'e', 'l', 'l', 'l', 'l', 'l', 'l' }, { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l' }, { 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l' }, { 'l', 'l', 's', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v' }, { 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v' }, { 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'v', 'v', 'v' }, { 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l' }, { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l' }, { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l' }, { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l' } });
            return level.get_json();
        }
    }
}
﻿using System;
using System.Collections.Generic;
using Controllers;

namespace Levels
{
    /// <summary>
    /// used for storing all level layouts shown as below
    /// level layout is as following:
    /// top - bottom / left - right
    /// l = empty space
    /// v = plane
    /// e = end / goal
    /// b = starting position
    /// </summary>
    public class AllLevels
    {
        public static char[][,] levels =
        {
            new[,]
            {
                { 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'b', 'v' },
                { 'l', 'l', 'v', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'v', 'l' },
                { 'l', 'l', 'v', 'v', 'v', 'l' },
                { 'l', 'v', 'v', 'v', 'v', 'l' },
                { 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'e', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'v', 'v', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'v', 'v', 'v', 'l', 'l', 'l', 'l' },
                { 'v', 'b', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'l', 'v', 'l', 'l' },
                { 'v', 'e', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'v', 'v', 'v', 'v', 'l' },
                { 'v', 'b', 'v', 'v', 'l' },
                { 'v', 'v', 'v', 'v', 'l' },
                { 'v', 'v', 'v', 'v', 'l' },
                { 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'v' },
                { 'l', 'l', 'l', 'l', 'v' },
                { 'l', 'v', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'v', 'v' },
                { 'v', 'e', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l' }
            },
            new[,]
            {
                { 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'v', 'b', 'v', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'v', 't', 'v' },
                { 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'l', 'a', 'l', 'l', 'l', 'l' },
                { 'l', 'a', 'l', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'v', 'e', 'v' },
                { 'v', 'v', 'v', 'v', 'v', 'v' }
            },
            new[,]
            {
                { 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'v', 'v', 'a', 'a', 'v', 'v', 'l' },
                { 'l', 'v', 'e', 'v', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v' },
                { 't', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v' },
                { 'v', 'v', 'b', 'v', 'v', 'v', 'v', 'v', 'v', 'v' }
            },
            new[,]
            {
                { 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'b', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'f', 'f' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f' },
                { 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'f', 'f' },
                { 'v', 'e', 'v', 'v', 'l', 'l', 'l', 'f', 'f' },
                { 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'f', 'f' },
                { 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'f', 'f' },
                { 'l', 'l', 'f', 'f', 'l', 'l', 'v', 'f', 'f' },
                { 'f', 'f', 'f', 'f', 'v', 'v', 'v', 'l', 'l' },
                { 'f', 'f', 'f', 'f', 'v', 'v', 'v', 'l', 'l' },
                { 'f', 'v', 'f', 'f', 'l', 'l', 'l', 'l', 'l' },
                { 'f', 'f', 'f', 'f', 'l', 'l', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'b', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'e', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 't', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'e', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'b', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'v', 'f', 'f', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'f', 'f', 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'f', 'f', 'f', 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' }
            },
            new[,]
            {
                { 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'v', 'v', 'v', 'b', 'v', 'l', 'l' },
                { 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'a', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 't', 'l', 'l', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'e', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l' }
            },
            new[,]
            {
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'b', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'e', 'v' },
                { 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'b', 'v', 'l', 'l', 'l', 'v', 'e', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'v', 't', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'l', 'l', 'l', 'l', 'b', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'e', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'u', 'u' },
                { 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'q', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l' },
                { 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l' },
            },
            new[,]
            {
                { 'l', 'l', 't', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'f', 'v', 'v' },
                { 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f' },
                { 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f' },
                { 'v', 'f', 'v', 'v', 'f', 'l', 'l', 'l', 'f', 'f', 'v', 'l', 'l' },
                { 'f', 'f', 'f', 'f', 'f', 'v', 'l', 'l', 'f', 'f', 'l', 'l', 'l' },
                { 'f', 'f', 'f', 'l', 'l', 'v', 'l', 'l', 'f', 'f', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'f', 'f', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a' },
                { 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a' },
                { 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'a' },
                { 'f', 'v', 'v', 'f', 'l', 'l', 'l', 'v', 'v', 'v', 'a', 'a', 'a' },
                { 'f', 'b', 'f', 'f', 'l', 'l', 'l', 'v', 'e', 'v', 'l', 'l', 'l' },
                { 'f', 'f', 'f', 'f', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l' }
            },
            new[,]
            {
                { 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'v', 'e', 'v', 'v', 'a', 'a', 'a', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'l' },
                { 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'b', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 't', 'v' },
                { 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'v', 'v', 'v' }
            },
            new[,]
            {
                { 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f', 'f', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'v', 'b', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f', 'f', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 't', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'a', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'a', 'l', 'l', 'l', 'l', 'l', 'l', 'l' },
                { 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'v', 'l', 'l', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'v', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'l', 'l', 'l', 'v', 'v', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'e', 'v', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'v', 'l', 'l', 'v', 'l', 'l', 'l', 'v', 'v', 'v', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 'v', 'v', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'a', 'l', 'l', 'v', 't', 'v', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f', 'f', 'f', 'v', 'l', 'l', 'l', 'l', 'l' },
                { 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'f', 'f', 'f', 'f', 'f', 'f', 'l', 'l', 'l', 'l', 'l' }
            }
        };
    }
}
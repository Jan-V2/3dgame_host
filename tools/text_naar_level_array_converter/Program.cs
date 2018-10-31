using System;
using System.IO;
using System.Reflection;

namespace text_naar_level_array_converter
{
    class Program
    {
        static void Main(string[] args)
        {
            var path = Directory.GetParent(
                Directory.GetParent(
                    Directory.GetParent(
                        Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)
                    ).ToString()
                ).ToString()
            ).ToString();
            path += "\\level1.txt";
            TextReader fileStream = File.OpenText(path);
            var data = fileStream.ReadToEnd();

            var data2 = data.Split("\r\n");
            string output = "new char[,] {";
            foreach (var row in data2)
            {
                output += "{";
                foreach (var character in row)
                {
                    output += "'" + character + "',";
                }

                output = output.Remove(output.Length - 1);
                output += "},";
            }
            output = output.Remove(output.Length - 1);
            output += "};";
            Console.WriteLine(output);
            Console.ReadLine();
        }
    }
}
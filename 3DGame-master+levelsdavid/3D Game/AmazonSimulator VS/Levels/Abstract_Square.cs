namespace Levels
{
    public abstract class Abstract_Square
    {
        private bool is_solid;


        protected void set_values(bool isSolid)
        {
            this.is_solid = isSolid;

        }

        public bool get_is_solid()
        {
            return is_solid;
        }
    }

    public class Plain_Square : Abstract_Square
    {
        public Plain_Square()
        {
            set_values(true);
        }


        public class Empty_Square : Abstract_Square
        {
            public Empty_Square()
            {
                set_values(false);
            }
        }
    }
}
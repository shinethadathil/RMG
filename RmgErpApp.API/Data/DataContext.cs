using Microsoft.EntityFrameworkCore;
using RmgErpApp.API.Models;

namespace RmgErpApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
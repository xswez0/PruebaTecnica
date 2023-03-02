using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using PruebaTecnicaData.Models;
using System.Security.Cryptography.X509Certificates;

namespace PruebaTecnicaData
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DataContext() : base() { }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=PruebaTecnica;Trusted_Connection=True;");
            }
        }
    }
}
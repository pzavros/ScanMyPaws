using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<PetProfile> PetProfiles { get; set; }
        public DbSet<QRCode> QRCodes { get; set; }
    }
}
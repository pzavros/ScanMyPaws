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
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Predefine statuses
            modelBuilder.Entity<Status>().HasData(
                new Status { StatusID = 1, StatusName = "Pending", Type = "Order" },
                new Status { StatusID = 2, StatusName = "Completed", Type = "Order" },
                new Status { StatusID = 3, StatusName = "Canceled", Type = "Order" }
            );

            // Configure Order foreign key relationship for OrderStatusID
            modelBuilder.Entity<Order>()
                .HasOne(o => o.OrderStatus)
                .WithMany()
                .HasForeignKey(o => o.OrderStatusID)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascading deletes

            base.OnModelCreating(modelBuilder);
        }

    }
}
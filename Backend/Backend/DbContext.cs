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

            // Configure Order <-> QRCode relationship
            modelBuilder.Entity<Order>()
                .HasOne(o => o.QRCode)
                .WithMany() // No navigation property in QRCode
                .HasForeignKey(o => o.QRCodeID)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete ensures the QRCode is deleted when the Order is deleted


            base.OnModelCreating(modelBuilder);
        }
    }
}
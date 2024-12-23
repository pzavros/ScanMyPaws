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
        public DbSet<DogBreed> DogBreeds { get; set; }

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
                .OnDelete(DeleteBehavior.NoAction);

            // Configure Order <-> QRCode relationship
            modelBuilder.Entity<Order>()
                .HasOne(o => o.QRCode)
                .WithMany()
                .HasForeignKey(o => o.QRCodeID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure PetProfile <-> User relationship
            modelBuilder.Entity<PetProfile>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure PetProfile <-> QRCode relationship
            modelBuilder.Entity<PetProfile>()
                .HasOne(p => p.QRCode)
                .WithOne(q => q.PetProfile)
                .HasForeignKey<PetProfile>(p => p.QRCodeID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure DogBreed and seed data
            modelBuilder.Entity<DogBreed>().HasData(
                new DogBreed { BreedID = 1, BreedName = "Affenpinscher" },
                new DogBreed { BreedID = 2, BreedName = "Airedale Terrier" },
                new DogBreed { BreedID = 3, BreedName = "Akita" },
                // Add all other breeds here
                new DogBreed { BreedID = 200, BreedName = "Yorkshire Terrier" }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}

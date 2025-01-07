using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<PetProfile> PetProfiles { get; set; }
        public DbSet<QRCode> QRCodes { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<DogBreed> DogBreeds { get; set; }
        public DbSet<PetCard> PetCards { get; set; }

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
                new DogBreed { BreedID = 4, BreedName = "Alaskan Malamute" },
                new DogBreed { BreedID = 5, BreedName = "American Bulldog" },
                new DogBreed { BreedID = 6, BreedName = "American Eskimo Dog" },
                new DogBreed { BreedID = 7, BreedName = "American Foxhound" },
                new DogBreed { BreedID = 8, BreedName = "American Pit Bull Terrier" },
                new DogBreed { BreedID = 9, BreedName = "American Staffordshire Terrier" },
                new DogBreed { BreedID = 10, BreedName = "Anatolian Shepherd" },
                new DogBreed { BreedID = 11, BreedName = "Australian Cattle Dog" },
                new DogBreed { BreedID = 12, BreedName = "Australian Shepherd" },
                new DogBreed { BreedID = 13, BreedName = "Barbet" },
                new DogBreed { BreedID = 14, BreedName = "Basenji" },
                new DogBreed { BreedID = 15, BreedName = "Basset Hound" },
                new DogBreed { BreedID = 16, BreedName = "Beagle" },
                new DogBreed { BreedID = 17, BreedName = "Bearded Collie" },
                new DogBreed { BreedID = 18, BreedName = "Beauceron" },
                new DogBreed { BreedID = 19, BreedName = "Bedlington Terrier" },
                new DogBreed { BreedID = 20, BreedName = "Belgian Malinois" },
                new DogBreed { BreedID = 21, BreedName = "Bernese Mountain Dog" },
                new DogBreed { BreedID = 22, BreedName = "Bichon Frise" },
                new DogBreed { BreedID = 23, BreedName = "Biewer Terrier" },
                new DogBreed { BreedID = 24, BreedName = "Bloodhound" },
                new DogBreed { BreedID = 25, BreedName = "Bluetick Coonhound" },
                new DogBreed { BreedID = 26, BreedName = "Boerboel" },
                new DogBreed { BreedID = 27, BreedName = "Bolognese" },
                new DogBreed { BreedID = 28, BreedName = "Border Collie" },
                new DogBreed { BreedID = 29, BreedName = "Border Terrier" },
                new DogBreed { BreedID = 30, BreedName = "Borzoi" },
                new DogBreed { BreedID = 31, BreedName = "Boston Terrier" },
                new DogBreed { BreedID = 32, BreedName = "Bouvier des Flandres" },
                new DogBreed { BreedID = 33, BreedName = "Boxer" },
                new DogBreed { BreedID = 34, BreedName = "Boykin Spaniel" },
                new DogBreed { BreedID = 35, BreedName = "Briard" },
                new DogBreed { BreedID = 36, BreedName = "Brittany" },
                new DogBreed { BreedID = 37, BreedName = "Brussels Griffon" },
                new DogBreed { BreedID = 38, BreedName = "Bull Terrier" },
                new DogBreed { BreedID = 39, BreedName = "Bulldog" },
                new DogBreed { BreedID = 40, BreedName = "Bullmastiff" },
                new DogBreed { BreedID = 41, BreedName = "Cairn Terrier" },
                new DogBreed { BreedID = 42, BreedName = "Cane Corso" },
                new DogBreed { BreedID = 43, BreedName = "Cardigan Welsh Corgi" },
                new DogBreed { BreedID = 44, BreedName = "Cavalier King Charles Spaniel" },
                new DogBreed { BreedID = 45, BreedName = "Chesapeake Bay Retriever" },
                new DogBreed { BreedID = 46, BreedName = "Chihuahua" },
                new DogBreed { BreedID = 47, BreedName = "Chinese Crested" },
                new DogBreed { BreedID = 48, BreedName = "Chinese Shar-Pei" },
                new DogBreed { BreedID = 49, BreedName = "Chinook" },
                new DogBreed { BreedID = 50, BreedName = "Chow Chow" },
                new DogBreed { BreedID = 51, BreedName = "Clumber Spaniel" },
                new DogBreed { BreedID = 52, BreedName = "Cocker Spaniel" },
                new DogBreed { BreedID = 53, BreedName = "Collie" },
                new DogBreed { BreedID = 54, BreedName = "Coton de Tulear" },
                new DogBreed { BreedID = 55, BreedName = "Dachshund" },
                new DogBreed { BreedID = 56, BreedName = "Dalmatian" },
                new DogBreed { BreedID = 57, BreedName = "Doberman Pinscher" },
                new DogBreed { BreedID = 58, BreedName = "Dogo Argentino" },
                new DogBreed { BreedID = 59, BreedName = "Dogue de Bordeaux" },
                new DogBreed { BreedID = 60, BreedName = "Dutch Shepherd" },
                new DogBreed { BreedID = 61, BreedName = "English Cocker Spaniel" },
                new DogBreed { BreedID = 62, BreedName = "English Setter" },
                new DogBreed { BreedID = 63, BreedName = "English Springer Spaniel" },
                new DogBreed { BreedID = 64, BreedName = "Entlebucher Mountain Dog" },
                new DogBreed { BreedID = 65, BreedName = "Flat-Coated Retriever" },
                new DogBreed { BreedID = 66, BreedName = "French Bulldog" },
                new DogBreed { BreedID = 67, BreedName = "German Pinscher" },
                new DogBreed { BreedID = 68, BreedName = "German Shepherd" },
                new DogBreed { BreedID = 69, BreedName = "German Shorthaired Pointer" },
                new DogBreed { BreedID = 70, BreedName = "German Wirehaired Pointer" },
                new DogBreed { BreedID = 71, BreedName = "Giant Schnauzer" },
                new DogBreed { BreedID = 72, BreedName = "Golden Retriever" },
                new DogBreed { BreedID = 73, BreedName = "Gordon Setter" },
                new DogBreed { BreedID = 74, BreedName = "Great Dane" },
                new DogBreed { BreedID = 75, BreedName = "Great Pyrenees" },
                new DogBreed { BreedID = 76, BreedName = "Greater Swiss Mountain Dog" },
                new DogBreed { BreedID = 77, BreedName = "Greyhound" },
                new DogBreed { BreedID = 78, BreedName = "Harrier" },
                new DogBreed { BreedID = 79, BreedName = "Havanese" },
                new DogBreed { BreedID = 80, BreedName = "Irish Setter" },
                new DogBreed { BreedID = 81, BreedName = "Irish Terrier" },
                new DogBreed { BreedID = 82, BreedName = "Irish Water Spaniel" },
                new DogBreed { BreedID = 83, BreedName = "Irish Wolfhound" },
                new DogBreed { BreedID = 84, BreedName = "Italian Greyhound" },
                new DogBreed { BreedID = 85, BreedName = "Jack Russell Terrier" },
                new DogBreed { BreedID = 86, BreedName = "Japanese Chin" },
                new DogBreed { BreedID = 87, BreedName = "Keeshond" },
                new DogBreed { BreedID = 88, BreedName = "Kerry Blue Terrier" },
                new DogBreed { BreedID = 89, BreedName = "Komondor" },
                new DogBreed { BreedID = 90, BreedName = "Kuvasz" },
                new DogBreed { BreedID = 91, BreedName = "Labrador Retriever" },
                new DogBreed { BreedID = 92, BreedName = "Lagotto Romagnolo" },
                new DogBreed { BreedID = 93, BreedName = "Lakeland Terrier" },
                new DogBreed { BreedID = 94, BreedName = "Leonberger" },
                new DogBreed { BreedID = 95, BreedName = "Lhasa Apso" },
                new DogBreed { BreedID = 96, BreedName = "Maltese" },
                new DogBreed { BreedID = 97, BreedName = "Manchester Terrier" },
                new DogBreed { BreedID = 98, BreedName = "Mastiff" },
                new DogBreed { BreedID = 99, BreedName = "Miniature Pinscher" },
                new DogBreed { BreedID = 100, BreedName = "Miniature Schnauzer" },
                new DogBreed { BreedID = 101, BreedName = "Neapolitan Mastiff" },
                new DogBreed { BreedID = 102, BreedName = "Nederlandse Kooikerhondje" },
                new DogBreed { BreedID = 103, BreedName = "Newfoundland" },
                new DogBreed { BreedID = 104, BreedName = "Norfolk Terrier" },
                new DogBreed { BreedID = 105, BreedName = "Norwegian Elkhound" },
                new DogBreed { BreedID = 106, BreedName = "Norwich Terrier" },
                new DogBreed { BreedID = 107, BreedName = "Nova Scotia Duck Tolling Retriever" },
                new DogBreed { BreedID = 108, BreedName = "Old English Sheepdog" },
                new DogBreed { BreedID = 109, BreedName = "Papillon" },
                new DogBreed { BreedID = 110, BreedName = "Pekingese" },
                new DogBreed { BreedID = 111, BreedName = "Pembroke Welsh Corgi" },
                new DogBreed { BreedID = 112, BreedName = "Pharaoh Hound" },
                new DogBreed { BreedID = 113, BreedName = "Plott Hound" },
                new DogBreed { BreedID = 114, BreedName = "Pointer" },
                new DogBreed { BreedID = 115, BreedName = "Pomeranian" },
                new DogBreed { BreedID = 116, BreedName = "Poodle" },
                new DogBreed { BreedID = 117, BreedName = "Portuguese Water Dog" },
                new DogBreed { BreedID = 118, BreedName = "Pug" },
                new DogBreed { BreedID = 119, BreedName = "Puli" },
                new DogBreed { BreedID = 120, BreedName = "Pumi" },
                new DogBreed { BreedID = 121, BreedName = "Rat Terrier" },
                new DogBreed { BreedID = 122, BreedName = "Redbone Coonhound" },
                new DogBreed { BreedID = 123, BreedName = "Rhodesian Ridgeback" },
                new DogBreed { BreedID = 124, BreedName = "Rottweiler" },
                new DogBreed { BreedID = 125, BreedName = "Saint Bernard" },
                new DogBreed { BreedID = 126, BreedName = "Saluki" },
                new DogBreed { BreedID = 127, BreedName = "Samoyed" },
                new DogBreed { BreedID = 128, BreedName = "Schipperke" },
                new DogBreed { BreedID = 129, BreedName = "Shetland Sheepdog" },
                new DogBreed { BreedID = 130, BreedName = "Shiba Inu" },
                new DogBreed { BreedID = 131, BreedName = "Shih Tzu" },
                new DogBreed { BreedID = 132, BreedName = "Siberian Husky" },
                new DogBreed { BreedID = 133, BreedName = "Silky Terrier" },
                new DogBreed { BreedID = 134, BreedName = "Smooth Fox Terrier" },
                new DogBreed { BreedID = 135, BreedName = "Spanish Water Dog" },
                new DogBreed { BreedID = 136, BreedName = "Staffordshire Bull Terrier" },
                new DogBreed { BreedID = 137, BreedName = "Standard Schnauzer" },
                new DogBreed { BreedID = 138, BreedName = "Swedish Vallhund" },
                new DogBreed { BreedID = 139, BreedName = "Tibetan Mastiff" },
                new DogBreed { BreedID = 140, BreedName = "Tibetan Spaniel" },
                new DogBreed { BreedID = 141, BreedName = "Tibetan Terrier" },
                new DogBreed { BreedID = 142, BreedName = "Vizsla" },
                new DogBreed { BreedID = 143, BreedName = "Weimaraner" },
                new DogBreed { BreedID = 144, BreedName = "Welsh Springer Spaniel" },
                new DogBreed { BreedID = 145, BreedName = "Welsh Terrier" },
                new DogBreed { BreedID = 146, BreedName = "West Highland White Terrier" },
                new DogBreed { BreedID = 147, BreedName = "Whippet" },
                new DogBreed { BreedID = 148, BreedName = "Xoloitzcuintli" },
                new DogBreed { BreedID = 149, BreedName = "Yorkshire Terrier" },
                new DogBreed { BreedID = 150, BreedName = "Australian Terrier" },
                new DogBreed { BreedID = 151, BreedName = "Black Russian Terrier" },
                new DogBreed { BreedID = 152, BreedName = "Brittany Spaniel" },
                new DogBreed { BreedID = 153, BreedName = "Catahoula Leopard Dog" },
                new DogBreed { BreedID = 154, BreedName = "Cavalier Spaniel" },
                new DogBreed { BreedID = 155, BreedName = "Curly-Coated Retriever" },
                new DogBreed { BreedID = 156, BreedName = "English Bulldog" },
                new DogBreed { BreedID = 157, BreedName = "English Foxhound" },
                new DogBreed { BreedID = 158, BreedName = "Finnish Spitz" },
                new DogBreed { BreedID = 159, BreedName = "Glen of Imaal Terrier" },
                new DogBreed { BreedID = 160, BreedName = "Great Pyrenean" },
                new DogBreed { BreedID = 161, BreedName = "Irish Red and White Setter" },
                new DogBreed { BreedID = 162, BreedName = "Lakeland Terrier" },
                new DogBreed { BreedID = 163, BreedName = "Lowchen" },
                new DogBreed { BreedID = 164, BreedName = "Mexican Hairless Dog" },
                new DogBreed { BreedID = 165, BreedName = "Norwegian Buhund" },
                new DogBreed { BreedID = 166, BreedName = "Norwegian Lundehund" },
                new DogBreed { BreedID = 167, BreedName = "Otterhound" },
                new DogBreed { BreedID = 168, BreedName = "Petit Basset Griffon Vendeen" },
                new DogBreed { BreedID = 169, BreedName = "Portuguese Podengo" },
                new DogBreed { BreedID = 170, BreedName = "Pudelpointer" },
                new DogBreed { BreedID = 171, BreedName = "Shiloh Shepherd" },
                new DogBreed { BreedID = 172, BreedName = "Skye Terrier" },
                new DogBreed { BreedID = 173, BreedName = "Soft-Coated Wheaten Terrier" },
                new DogBreed { BreedID = 174, BreedName = "Stabyhoun" },
                new DogBreed { BreedID = 175, BreedName = "Sussex Spaniel" },
                new DogBreed { BreedID = 176, BreedName = "Swedish Lapphund" },
                new DogBreed { BreedID = 177, BreedName = "Taiwan Dog" },
                new DogBreed { BreedID = 178, BreedName = "Thai Ridgeback" },
                new DogBreed { BreedID = 179, BreedName = "Tosa" },
                new DogBreed { BreedID = 180, BreedName = "Treeing Walker Coonhound" },
                new DogBreed { BreedID = 181, BreedName = "Volpino Italiano" },
                new DogBreed { BreedID = 182, BreedName = "Wirehaired Vizsla" },
                new DogBreed { BreedID = 183, BreedName = "Wetterhoun" },
                new DogBreed { BreedID = 184, BreedName = "Alano Español" },
                new DogBreed { BreedID = 185, BreedName = "Central Asian Shepherd" },
                new DogBreed { BreedID = 186, BreedName = "Kangal" },
                new DogBreed { BreedID = 187, BreedName = "Estrela Mountain Dog" },
                new DogBreed { BreedID = 188, BreedName = "Chinook" },
                new DogBreed { BreedID = 189, BreedName = "Bohemian Shepherd" },
                new DogBreed { BreedID = 190, BreedName = "Blue Lacy" },
                new DogBreed { BreedID = 191, BreedName = "Danish-Swedish Farmdog" },
                new DogBreed { BreedID = 192, BreedName = "Dutch Smoushond" },
                new DogBreed { BreedID = 193, BreedName = "Old Danish Pointer" },
                new DogBreed { BreedID = 194, BreedName = "Romanian Raven Shepherd Dog" },
                new DogBreed { BreedID = 195, BreedName = "Shikoku" },
                new DogBreed { BreedID = 196, BreedName = "Telomian" },
                new DogBreed { BreedID = 197, BreedName = "Transylvanian Hound" },
                new DogBreed { BreedID = 198, BreedName = "Tibetan Kyi Apso" },
                new DogBreed { BreedID = 199, BreedName = "Yakutian Laika" },
                new DogBreed { BreedID = 200, BreedName = "Yorkshire Terrier" }
            );
            base.OnModelCreating(modelBuilder);
        }
    }
}
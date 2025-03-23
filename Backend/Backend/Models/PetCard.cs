using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PetCard
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateModified { get; set; }

        [Key]
        public int PetCardID { get; set; }

        [Required]
        [ForeignKey("PetProfile")]
        public int PetID { get; set; }
        public virtual PetProfile PetProfile { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserID { get; set; }
        public virtual User User { get; set; }
        public string UniqueUrl { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string MobilePhone1 { get; set; }
        public string? MobilePhone2 { get; set; }

        [StringLength(500)]
        public string? ImportantInformation { get; set; }

        [StringLength(1000)]
        public string? AdditionalInfo { get; set; }

        // New Columns
        public string? Address { get; set; }
        public string? AlternativeContactName { get; set; }
        public string? AlternativeContactPhone { get; set; }

        // Pet Details
        public string PetName { get; set; }
        public string? BreedName { get; set; }
        public int? Age { get; set; }
        public string? Sex { get; set; }
        public string? SpecialNotes { get; set; }
        public byte[]? Photo { get; set; }
        public double? Weight { get; set; }
        public string? Size { get; set; }
    }
}
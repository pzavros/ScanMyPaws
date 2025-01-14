using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PetProfile
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;

        public DateTime? DateModified { get; set; }

        [Key]
        public int PetID { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserID { get; set; }

        [Required]
        [StringLength(100)]
        public string PetName { get; set; }
        public string? UniqueUrl { get; set; }
        public int? Age { get; set; }

        [ForeignKey("DogBreed")]
        public int? BreedID { get; set; }

        public virtual DogBreed DogBreed { get; set; }

        public bool IsTransferred { get; set; } = false;

        [StringLength(10)]
        public string? Sex { get; set; }

        public byte[]? Photo { get; set; }

        public string? SpecialNotes { get; set; }

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        [ForeignKey("QRCode")]
        public int QRCodeID { get; set; }

        public virtual QRCode QRCode { get; set; }

        public virtual User User { get; set; }
        public bool IsHavingCard { get; set; } = false;
    }
}
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

        public int? Age { get; set; }

        public bool IsTransferred { get; set; } = false;
        
        public string? Breed { get; set; }
        public string? Sex { get; set; } 
        public string? PhotoURL { get; set; }
        public string? SpecialNotes { get; set; }
        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        // Foreign Key to QRCode (One-to-One relationship)
        [ForeignKey("QRCode")]
        public int QRCodeID { get; set; }

        public virtual QRCode QRCode { get; set; }

        // Navigation property to User
        public virtual User User { get; set; }
    }
}
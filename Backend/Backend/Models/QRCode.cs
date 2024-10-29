using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class QRCode
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateModified { get; set; }
        [Key]
        public int QRCodeID { get; set; }
        [Required]
        [StringLength(500)]
        public string? QRCodeData { get; set; }
        public string? QRCodeImage { get; set; } 
        public bool IsScannedForFirstTime { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime DateGenerated { get; set; } = DateTime.Now;
        // Navigation property to PetProfile
        public virtual PetProfile PetProfile { get; set; }
    }
}
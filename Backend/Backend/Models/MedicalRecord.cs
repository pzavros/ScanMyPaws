using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class MedicalRecord
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;

        public DateTime? DateModified { get; set; }

        [Key]
        public int MedicalRecordID { get; set; }

        [Required]
        [ForeignKey("PetProfile")]
        public int PetID { get; set; }

        [Required]
        [ForeignKey("MedicalRecordType")]
        public int TypeID { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public DateTime? NextDueDate { get; set; }

        [Required]
        [StringLength(255)]
        public string Description { get; set; }

        public string? Notes { get; set; }

        [StringLength(255)]
        public string? VetClinicName { get; set; }

        public bool IsDeleted { get; set; } = false;

        public virtual PetProfile PetProfile { get; set; }

        public virtual MedicalRecordType MedicalRecordType { get; set; }
    }

}
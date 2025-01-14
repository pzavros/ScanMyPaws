using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class MedicalRecordType
    {
        [Key]
        public int TypeID { get; set; }

        [Required]
        [StringLength(255)]
        public string TypeName { get; set; }

        public bool IsActive { get; set; } = true;

        public virtual ICollection<MedicalRecord> MedicalRecords { get; set; }
    }
}
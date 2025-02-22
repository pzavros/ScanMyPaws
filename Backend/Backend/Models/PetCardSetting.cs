using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Models;

namespace ScanMyPaws.Models
{
    public class PetCardSetting
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
        [Key]
        public int PetCardSettingId { get; set; }
        [ForeignKey("PetProfile")]
        public int PetId { get; set; }
        public virtual PetProfile PetProfile { get; set; }
        public bool PetName { get; set; } = true;
        public bool BreedName { get; set; } = true;
        public bool Sex { get; set; } = true;
        public bool Age { get; set; } = true;
        public bool Weight { get; set; } = true;
        public bool MobilePhone1 { get; set; } = true;
        public bool MobilePhone2 { get; set; } = true;
        public bool Address { get; set; } = true;
        public bool AlternativeContact { get; set; } = true;
    }
}
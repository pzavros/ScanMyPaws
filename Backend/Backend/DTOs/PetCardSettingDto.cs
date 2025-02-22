using System;

namespace Backend.Dtos
{
    public class PetCardSettingDto
    {
        public int PetCardSettingId { get; set; }
        public int PetId { get; set; }
        public bool PetName { get; set; }
        public bool BreedName { get; set; }
        public bool Sex { get; set; }
        public bool Age { get; set; }
        public bool Weight { get; set; }
        public bool MobilePhone1 { get; set; }
        public bool MobilePhone2 { get; set; }
        public bool Address { get; set; }
        public bool AlternativeContact { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
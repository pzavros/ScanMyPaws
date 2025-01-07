namespace Backend.Dtos
{
    public class PetCardDto
    {
        public int PetCardID { get; set; }
        public int PetID { get; set; }
        public int UserID { get; set; } 
        public string FullName { get; set; }
        public string MobilePhone1 { get; set; }
        public string? MobilePhone2 { get; set; }
        public string? Address { get; set; }
        public string? AlternativeContactName { get; set; }
        public string? AlternativeContactPhone { get; set; }
        public string? ImportantInformation { get; set; }
        public string? AdditionalInfo { get; set; }

        // Pet Details
        public string PetName { get; set; }
        public string? BreedName { get; set; }
        public int? Age { get; set; }
        public string? Sex { get; set; }
        public string? SpecialNotes { get; set; }
        public byte[]? Photo { get; set; }
        public double? Weight { get; set; }
    }
}
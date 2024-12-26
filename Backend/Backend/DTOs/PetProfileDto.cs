public class PetProfileDto
{
    public int PetID { get; set; }
    public int UserID { get; set; }
    public string PetName { get; set; }
    public int? BreedID { get; set; }
    public string? BreedName { get; set; } // To include the breed name
    public int? Age { get; set; }
    public bool IsTransferred { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateCreated { get; set; }
    public string? Sex { get; set; }
    public byte[]? Photo { get; set; }
    public string? SpecialNotes { get; set; }
    public int QRCodeID { get; set; }
}
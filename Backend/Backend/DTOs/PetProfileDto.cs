public class PetProfileDto
{
    public int PetID { get; set; }
    public int UserID { get; set; }
    public string PetName { get; set; }
    public int? BreedID { get; set; }
    public string? BreedName { get; set; }
    public string? UniqueUrl { get; set; }
    public int? Age { get; set; }
    public int? Weight { get; set; }
    public string? Size { get; set; }
    public bool IsTransferred { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateCreated { get; set; }
    public string? Sex { get; set; }
    public byte[]? Photo { get; set; }
    public string? SpecialNotes { get; set; }
    public int QRCodeID { get; set; }
    public bool IsHavingCard { get; set; } = false;

}
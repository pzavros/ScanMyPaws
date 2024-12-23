public class PetProfileDto
{
    public int PetID { get; set; }
    public int UserID { get; set; }
    public string PetName { get; set; }
    public string? Breed { get; set; }
    public int? Age { get; set; }
    public bool IsTransferred { get; set; }
    public bool IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateCreated { get; set; }
    public string? Sex { get; set; }
    public string? PhotoURL { get; set; } // Can store Base64 or URL
    public string? SpecialNotes { get; set; }
    public int QRCodeID { get; set; }
}
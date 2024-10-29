namespace Backend.DTOs
{
    public class QRCodeDto
    {
        public int QRCodeID { get; set; }
        public string QRCodeData { get; set; }
        public string? QRCodeImage { get; set; }
        public bool IsScannedForFirstTime { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateGenerated { get; set; }
        public int? PetProfileID { get; set; } // Optional link to PetProfile
    }
}
namespace Backend.DTOs
{
    public class MedicalRecordDto
    {
        public int MedicalRecordID { get; set; }
        public int PetID { get; set; }
        public int TypeID { get; set; }
        public string? Type { get; set; }
        public DateTime Date { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string Description { get; set; }
        public string? Notes { get; set; }
        public string? VetClinicName { get; set; }
    }
}
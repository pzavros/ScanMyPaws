namespace Backend.DTOs
{
    public class StartChatRequest
    {
        public int PetId { get; set; }
        public string FinderName { get; set; }
        public string FinderSurname { get; set; }
        public string FinderEmail { get; set; }
    }
}
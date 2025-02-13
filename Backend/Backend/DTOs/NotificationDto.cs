namespace Backend.DTOs
{
    public class NotificationDto
    {
        public int NotificationID { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; }
        public int? ReferenceID { get; set; } 
        public DateTime? ScheduledTime { get; set; }
    }
}
namespace Backend.Models
{
    public class Notification
    {
        public int NotificationID { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
        
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; } = false;
        public string Type { get; set; }
        public int? ReferenceID { get; set; }
        public DateTime? ScheduledTime { get; set; }
    }
}
namespace Backend.DTOs
{
    public class ScheduleDto
    {
        public int ScheduleID { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
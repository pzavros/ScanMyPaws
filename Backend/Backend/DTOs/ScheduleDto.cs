using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    public class ScheduleDto
    {
        public int? ScheduleID { get; set; }

        [Required(ErrorMessage = "UserID is required.")]
        public int UserID { get; set; }

        [Required(ErrorMessage = "The Title field is required.")]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required(ErrorMessage = "The Date field is required.")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "The Time field is required.")]
        public TimeSpan Time { get; set; }

        [Required(ErrorMessage = "The Description field is required.")]
        [MaxLength(500)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
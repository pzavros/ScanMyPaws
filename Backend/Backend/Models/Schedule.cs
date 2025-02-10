using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Schedule
    {
        [Key]
        public int ScheduleID { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;

        // 🔹 Relation to User
        [Required]
        public int UserID { get; set; }
        
        [ForeignKey("UserID")]
        public virtual User User { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public bool IsCompleted { get; set; } = false;
    }
}
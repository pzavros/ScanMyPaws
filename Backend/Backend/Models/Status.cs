using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Status
    {
        [Key]
        public int StatusID { get; set; }

        public string StatusName { get; set; }

        public string Type { get; set; }
    }
}
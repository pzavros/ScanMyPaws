using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class PetLocationHistory
    {
        [Key]
        public int PetLocationHistoryID { get; set; }

        [ForeignKey("PetCard")]
        public int PetCardID { get; set; }
        public virtual PetCard PetCard { get; set; }
        public string FinderName { get; set; }
        public string FinderContact { get; set; }
        public string Location { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime DateFound { get; set; } = DateTime.UtcNow;
    }
}
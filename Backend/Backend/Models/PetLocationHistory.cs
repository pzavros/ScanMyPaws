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

        // If you prefer referencing PetProfile directly, do it this way:
        // [ForeignKey("PetProfile")]
        // public int PetID { get; set; }
        // public virtual PetProfile PetProfile { get; set; }

        public string FinderName { get; set; }
        public string FinderContact { get; set; }
        
        // The text location, e.g. "Central Park, NYC"
        public string Location { get; set; }

        // Optionally store lat/long if you want map integration
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public DateTime DateFound { get; set; } = DateTime.UtcNow;
    }
}
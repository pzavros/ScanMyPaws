using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class DogBreed
    {
        [Key]
        public int BreedID { get; set; }

        [Required]
        [StringLength(100)]
        public string BreedName { get; set; }
    }
}
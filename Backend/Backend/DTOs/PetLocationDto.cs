namespace Backend.Dtos
{
    public class PetLocationDto
    {
        public int PetCardID { get; set; }
        public string FinderName { get; set; }
        public string FinderContact { get; set; }
        public string Location { get; set; } 
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}
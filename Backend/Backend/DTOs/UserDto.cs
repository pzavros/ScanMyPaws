namespace Backend.DTOs
{
    public class UserDto
    {
        public int? UserID { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool IsActive { get; set; } = true;
    }
}
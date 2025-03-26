using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateModified { get; set; }
        [Key]
        public int UserID { get; set; }
        [Required]
        [StringLength(256)]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsAdmin { get; set; } = false;
        public bool IsVerified { get; set; } = false;
        public bool IsPrimaryOwner { get; set; } = true;
        public bool IsAccountTransferRequested { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public bool IsDeleted { get; set; } = false;
        public DateTime? DateOfBirth { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? ZipCode { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public int FailedLoginAttempts { get; set; } = 0;
    }
}
using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> CreateUser(UserDto userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                PasswordHash = userDto.PasswordHash,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                PhoneNumber = userDto.PhoneNumber,
                IsAdmin = userDto.IsAdmin,
                IsActive = userDto.IsActive
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            userDto.UserID = user.UserID;
            return userDto;
        }

        public async Task<UserDto> GetUserById(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            return new UserDto
            {
                UserID = user.UserID,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                IsAdmin = user.IsAdmin,
                IsActive = user.IsActive
            };
        }

        public async Task<bool> DeactivateUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
using Backend.DTOs;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
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
                IsActive = userDto.IsActive,
                DateOfBirth = userDto.DateOfBirth,
                Gender = userDto.Gender,
                Address = userDto.Address,
                City = userDto.City,
                State = userDto.State,
                Country = userDto.Country,
                ZipCode = userDto.ZipCode
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
                IsActive = user.IsActive,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                Address = user.Address,
                City = user.City,
                State = user.State,
                Country = user.Country,
                ZipCode = user.ZipCode,
                LastLoginDate = user.LastLoginDate,
                FailedLoginAttempts = user.FailedLoginAttempts
            };
        }

        public async Task<UserDto> UpdateUserProfile(UserDto userDto)
        {
            var user = await _context.Users.FindAsync(userDto.UserID);
            if (user == null) return null;

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.PhoneNumber = userDto.PhoneNumber;
            user.DateOfBirth = userDto.DateOfBirth;
            user.Gender = userDto.Gender;
            user.Address = userDto.Address;
            user.City = userDto.City;
            user.State = userDto.State;
            user.Country = userDto.Country;
            user.ZipCode = userDto.ZipCode;

            user.DateModified = DateTime.Now;
            await _context.SaveChangesAsync();

            return userDto;
        }

        public async Task<bool> DeactivateUser(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            user.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<UserDto> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
            if (user == null) return null;

            return new UserDto
            {
                UserID = user.UserID,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                LastLoginDate = user.LastLoginDate
            };
        }

        public async Task UpdateLastLoginDate(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.LastLoginDate = DateTime.Now;
                await _context.SaveChangesAsync();
            }
        }
    }
}

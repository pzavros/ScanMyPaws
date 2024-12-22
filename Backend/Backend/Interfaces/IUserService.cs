using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateUser(UserDto userDto);
        Task<UserDto> GetUserById(int userId);
        Task<UserDto> UpdateUserProfile(UserDto userDto);
        Task<bool> DeactivateUser(int userId);
        Task<UserDto> AuthenticateUser(string email, string password);
        Task UpdateLastLoginDate(int userId);
    }
}
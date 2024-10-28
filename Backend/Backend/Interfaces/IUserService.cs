using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateUser(UserDto userDto);
        Task<UserDto> GetUserById(int userId);
        Task<bool> DeactivateUser(int userId);
    }
}
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using Backend.DTOs;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            var user = await _userService.CreateUser(userDto);
            return CreatedAtAction(nameof(GetUserById), new { userId = user.UserID }, user);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }

        [HttpPut("{userId}/deactivate")]
        public async Task<IActionResult> DeactivateUser(int userId)
        {
            var result = await _userService.DeactivateUser(userId);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
    }
}
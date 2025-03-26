using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Backend.Interfaces;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            try
            {
                var user = await _userService.CreateUser(userDto);
                return CreatedAtAction(nameof(GetUserById), new { userId = user.UserID }, user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        [HttpPut("{userId}/deactivate")]
        public async Task<IActionResult> DeactivateUser(int userId)
        {
            var result = await _userService.DeactivateUser(userId);
            if (!result)
                return NotFound(new { message = "User not found." });

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            var user = await _userService.AuthenticateUser(userDto.Email, userDto.PasswordHash);
            if (user == null)
                return Unauthorized("Invalid email or password.");

            if (user.UserID.HasValue)
            {
                await _userService.UpdateLastLoginDate(user.UserID.Value);
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
            if (userIdClaim == null)
                return Unauthorized("User is not logged in, or there is an issue with the UserID");

            var userId = int.Parse(userIdClaim.Value);
            var user = await _userService.GetUserById(userId);

            if (user == null)
                return NotFound(new { message = "User not found." });

            return Ok(user);
        }

        [HttpPut("profile")]
        [Consumes("application/json")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserDto? userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new { message = "Invalid request, userDto is missing or incorrectly formatted." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                return Unauthorized("UserID claim is missing from the token.");
            }

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Invalid UserID format in the token.");
            }

            userDto.UserID = userId;

            var updatedUser = await _userService.UpdateUserProfile(userDto);
            if (updatedUser == null)
            {
                return NotFound(new { message = "User not found." });
            }

            return Ok(updatedUser);
        }

        private string GenerateJwtToken(UserDto user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserID", user.UserID.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FirstName ?? "User")
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}

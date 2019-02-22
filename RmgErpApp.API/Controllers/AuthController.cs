using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RmgErpApp.API.Data;
using RmgErpApp.API.DTOs;
using RmgErpApp.API.Models;

namespace RmgErpApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            //validate request
            userForRegisterDTO.Username = userForRegisterDTO.ToLower();

            if(await _repo.UserExists(userForRegisterDTO.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                UserName = userForRegisterDTO.Username
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDTO.Password);

            return StatusCode(201);
        }
    }
}
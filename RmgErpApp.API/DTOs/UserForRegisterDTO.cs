using System.ComponentModel.DataAnnotations;

namespace RmgErpApp.API.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="The password should be 4-8 characters")]
        public string Password { get; set; }
    }
}
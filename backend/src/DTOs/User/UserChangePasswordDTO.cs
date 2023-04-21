using System.ComponentModel.DataAnnotations;

namespace backend.src.DTOs.User;

public class UserChangePasswordDTO
{
    [Required]
    public string CurrentPassword { get; set; } = null!;
    [Required]
    public string NewPassword { get; set; } = null!;
}
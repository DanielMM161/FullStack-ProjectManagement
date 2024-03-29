namespace backend.src.DTOs.Auth;

using System.ComponentModel.DataAnnotations;

public class AuthLoginDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}
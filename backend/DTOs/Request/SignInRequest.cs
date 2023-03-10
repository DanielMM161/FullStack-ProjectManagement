namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;

public class SignInRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;
}
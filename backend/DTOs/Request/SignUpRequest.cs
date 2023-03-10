namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;

public class SignUpRequest
{
    [Required]
    public string FirstName { get; set; } = null!;

    [Required]
    public string LastName { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [RegularExpression(@"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$",
        ErrorMessage = "At least onde digit, at leas one lowercas and uppercase character, at least one special character, minium 8 characters, maxium 32 characters")]
    public string Password { get; set; } = null!;
}
using System.ComponentModel.DataAnnotations;

namespace backend.src.DTOs.Google;

public class GoogleLoginDTO
{
    [Required]
    public string Token { get; set; } = null!;
}
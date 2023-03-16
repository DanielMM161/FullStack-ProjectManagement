namespace backend.src.DTOs.Auth;

public class AuthReadDTO
{
    public string Token { get; set; } = null!;
    public DateTime Expiration { get; set; }
}
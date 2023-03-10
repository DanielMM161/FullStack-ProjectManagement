namespace backend.DTOs.Response;

public class SignInResponse
{
    public string Token { get; set; } = null!;
    public DateTime Expiration { get; set; }
}
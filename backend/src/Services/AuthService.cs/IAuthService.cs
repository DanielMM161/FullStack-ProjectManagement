using backend.src.DTOs.Auth;

namespace backend.src.Services.AuthService.cs;

public interface IAuthService
{
    Task<AuthReadDTO?> Login(AuthLoginDTO request);
}
namespace backend.src.Services.AuthService.cs;

using backend.src.DTOs.Auth;
using backend.src.DTOs.User;

public interface IAuthService
{
    Task<AuthReadDTO?> Login(AuthLoginDTO request);
    Task<UserReadDTO> Profile();
}
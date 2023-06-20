namespace backend.src.Services.AuthService;

using backend.src.DTOs.Auth;
using backend.src.DTOs.Google;
using backend.src.DTOs.User;

public interface IAuthService
{
    Task<UserReadDTO> Login(AuthLoginDTO request);
    Task<UserReadDTO> Profile();
    Task<bool> Logout();
    Task<UserReadDTO> LoginGoogleAsync(GoogleLoginDTO request);
}
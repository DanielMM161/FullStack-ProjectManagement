using backend.src.DTOs.Auth;
using backend.src.DTOs.Google;

namespace backend.src.Services.GoogleService;

public interface IGoogleService
{
    Task<AuthReadDTO> LoginGoogleAsync(GoogleLoginDTO request);
}
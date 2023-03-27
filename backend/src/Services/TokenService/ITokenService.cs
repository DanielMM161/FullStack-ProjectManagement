namespace backend.src.Services.TokenService;

using backend.src.DTOs.Auth;
using backend.src.Models;

public interface ITokenService
{
    Task<AuthReadDTO> GenerateTokenAsync(User user);    
}
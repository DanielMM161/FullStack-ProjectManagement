namespace backend.src.Services.TokenService.cs;

using backend.src.DTOs.Auth;
using backend.src.Models;

public interface ITokenService
{
    Task<AuthReadDTO> GenerateTokenAsync(User user);    
}
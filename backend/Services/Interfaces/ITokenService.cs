namespace backend.Services.Interfaces;

using backend.DTOs.Response;
using backend.Models;

public interface ITokenService
{
    Task<SignInResponse> GenerateTokenAsync(User user);
}
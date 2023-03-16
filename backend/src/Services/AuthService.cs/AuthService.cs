namespace backend.src.Services.AuthService.cs;

using System.Threading.Tasks;
using backend.src.DTOs.Auth;
using backend.src.Models;
using backend.src.Services.TokenService.cs;
using Microsoft.AspNetCore.Identity;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthReadDTO?> Login(AuthLoginDTO request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user is null) 
        {
            return null;
        }
        if (!await _userManager.CheckPasswordAsync(user, request.Password))
        {
            return null;
        }
        return await _tokenService.GenerateTokenAsync(user);
    }
}
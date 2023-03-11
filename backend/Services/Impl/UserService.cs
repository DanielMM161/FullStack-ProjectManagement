namespace backend.Services.Impl;

using System.Threading.Tasks;
using backend.DTOs.Request;
using backend.DTOs.Response;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public UserService(UserManager<User> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<SignInResponse?> SignInAsync(SignInRequest request)
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

    public async Task<User?> SignUpAsync(SignUpRequest request)
    {
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.Email,
            Email = request.Email,
        };
        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return null;
        }
        return user;
    }
}
namespace backend.src.Services.AuthService;

using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.Auth;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Services.TokenService;
using Microsoft.AspNetCore.Identity;

public class AuthService : IAuthService
{
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IClaimsPrincipalService _claimService;
    private readonly IMapper _mapper;

    public AuthService(UserManager<User> userManager, ITokenService tokenService, IClaimsPrincipalService claimService, IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _claimService = claimService;
        _mapper = mapper;
    }

    public async Task<AuthReadDTO?> Login(AuthLoginDTO request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);        
        if (user is null) 
        {
            throw ServiceException.BadRequest("The Email is not valid");
        }

        if (!await _userManager.CheckPasswordAsync(user, request.Password))
        {
            throw ServiceException.BadRequest("Wrong Password");
        }        

        if (user.SessionActive)
        {
            throw ServiceException.BadRequest("There is another session active");
        }

        user.SessionActive = true;
        await _userManager.UpdateAsync(user);
        return await _tokenService.GenerateTokenAsync(user);
    }

    public async Task<UserReadDTO> Profile()
    {
        var user = await _userManager.FindByIdAsync(_claimService.GetUserId().ToString());
        if (user is null)
        {
            throw ServiceException.NotFound("Profile is not found");
        }
        return _mapper.Map<User, UserReadDTO>(user);
    }

    public async Task<bool> CloseSession()
    {
        var user = await _userManager.FindByIdAsync(_claimService.GetUserId().ToString());
        if (user is null)
        {
            throw ServiceException.NotFound("Profile is not found");
        }
        
        user.SessionActive = false;
        await _userManager.UpdateAsync(user);
        return true;
    }
}
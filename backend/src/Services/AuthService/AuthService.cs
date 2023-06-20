namespace backend.src.Services.AuthService;

using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.Auth;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Services.TokenService;
using backend.src.Repositories.UserRepo;
using backend.src.DTOs.Google;
using Google.Apis.Auth;

public class AuthService : IAuthService
{
    private readonly IUserRepo _userRepo;
    private readonly ITokenService _tokenService;
    private readonly IClaimsPrincipalService _claimService;
    private readonly IMapper _mapper;
    private readonly IConfiguration _config;

    public AuthService(IUserRepo userRepo, ITokenService tokenService, IClaimsPrincipalService claimService, IMapper mapper, IConfiguration config)
    {
        _userRepo = userRepo;
        _tokenService = tokenService;
        _claimService = claimService;
        _mapper = mapper;
        _config = config;
    }

    public async Task<UserReadDTO> Login(AuthLoginDTO request)
    {
        var user = await _userRepo.GetByEmail(request.Email);        
        if (user is null) 
        {
            throw ServiceException.BadRequest("The Email is not valid");
        }

        if (!await _userRepo.CheckPassword(user, request.Password))
        {
            throw ServiceException.BadRequest("Wrong Password");
        }        

        if (user.SessionActive)
        {
            throw ServiceException.BadRequest("There is another session active");
        }

        var token = await _tokenService.GenerateTokenAsync(user);
        var profile = _mapper.Map<User, UserReadDTO>(user);
        profile.Token = token.Token;
        profile.TokenExpiration = token.Expiration;

        user.SessionActive = true;
        await _userRepo.UpdateAsync(user);

        return profile;
    }

    public async Task<UserReadDTO> Profile()
    {
        var user = await _userRepo.GetById(_claimService.GetUserId());
        if (user is null)
        {
            throw ServiceException.NotFound("Profile is not found");
        }        
        return _mapper.Map<User, UserReadDTO>(user);
    }

    public async Task<bool> Logout()
    {
        var user = await _userRepo.GetById(_claimService.GetUserId());
        if (user is null)
        {
            throw ServiceException.NotFound("Profile is not found");
        }
        
        user.SessionActive = false;
        await _userRepo.UpdateAsync(user);
        return true;
    }

       public async Task<UserReadDTO> LoginGoogleAsync(GoogleLoginDTO request)
    {
        var settings = new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { _config["Authentication:Google:ClientId"] }
        };
        var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);

        if (payload is null)
        {
            throw ServiceException.NotFound("Profile is not found");
        }

        var user = await _userRepo.GetByEmail(payload.Email);
        if (user is null)
        {
            var newUser = new UserCreateDTO
            {
                Email = payload.Email,
                FirstName = payload.Name,
                LastName = payload.FamilyName,
                Password = PasswordGenerator.Generate()
            };            
            user = await _userRepo.Create(newUser);
        }

        var token = await _tokenService.GenerateTokenAsync(user);
        var profile = _mapper.Map<User, UserReadDTO>(user);
        profile.Token = token.Token;
        profile.TokenExpiration = token.Expiration;

        user.SessionActive = true;
        await _userRepo.UpdateAsync(user);

        return profile;        
    }
}
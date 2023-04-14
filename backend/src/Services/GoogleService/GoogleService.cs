namespace backend.src.Services.GoogleService;

using AutoMapper;
using backend.src.DTOs.Auth;
using backend.src.DTOs.Google;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Repositories.UserRepo;
using backend.src.Services.TokenService;
using Google.Apis.Auth;

public class GoogleService : IGoogleService
{
    private readonly IUserRepo _userRepo;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _config;
    protected readonly IMapper _mapper;

    public GoogleService(IConfiguration config, IUserRepo userRepo, ITokenService tokenService, IMapper mapper)
    {
        _config = config;
        _userRepo = userRepo;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<AuthReadDTO> LoginGoogleAsync(GoogleLoginDTO request)
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
        return await _tokenService.GenerateTokenAsync(user);
    }
}
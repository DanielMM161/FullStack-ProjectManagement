namespace backend.src.Services.UserService;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.UserRepo;
using backend.src.Services.TokenService;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;

public class UserService : IUserService
{
    private readonly IUserRepo _repo;
    protected readonly IMapper _mapper;
    private readonly IClaimsPrincipalService _claimsService;
    private readonly ITokenService _tokenService;
    
    public UserService(IUserRepo repo, IMapper mapper, IClaimsPrincipalService claimsService, ITokenService tokenService)
    {
        _repo = repo;
        _mapper = mapper;
        _claimsService = claimsService;
        _tokenService = tokenService;
    }

    public async Task<UserReadDTO> Create(UserCreateDTO request)
    {          
        var user = await _repo.Create(request);
        if (user is null)
        {
            throw ServiceException.BadRequest("Password Must Contain 1 Upper Letter, 1 Lower Letter, Alphanumeric and Special Caracter");
        }
        
        var token = await _tokenService.GenerateTokenAsync(user);
        var profile = _mapper.Map<User, UserReadDTO>(user);
        profile.Token = token.Token;
        profile.TokenExpiration = token.Expiration;
        
        return profile;
    }

    public async Task<ICollection<UserReadDTO>> GetAll()
    {
        var users = await _repo.GetAll();
        users = users.Where(u => u.Id != _claimsService.GetUserId()).ToArray();
        return _mapper.Map<ICollection<User>, ICollection<UserReadDTO>>(users);
    }

    public async Task<UserReadDTO> GetById(int id)
    {
        var user = await _repo.GetById(id);
        if (user is null)
        {
            throw ServiceException.NotFound();
        }
        return _mapper.Map<User, UserReadDTO>(user);
    }

    public async Task<UserReadDTO> UpdateAsync(UserUpdateDTO request)
    {
        var user = await _repo.GetById(_claimsService.GetUserId());
        if (user is null)
        {
            throw ServiceException.NotFound();
        }
        request.UpdateModel(user);
        await _repo.UpdateAsync(user);
        return _mapper.Map<User, UserReadDTO>(user);
    }

    public async Task<bool> ChangePassword(UserChangePasswordDTO request)
    {
        var user = await _repo.GetById(_claimsService.GetUserId());
        if (user is null)
        {
            throw ServiceException.NotFound();
        }
        var result = await _repo.ChangePassword(user, request.CurrentPassword, request.NewPassword);
        if (!result.Item1)
        {
            throw ServiceException.BadRequest(result.Item2);
        }
        return result.Item1;
    }

    public async Task<String> SaveUserProfilePicture(UserProfilePictureDTO request)
    {        
        if (request.File.Length == 0 || request.File == null)
        {            
            throw ServiceException.BadRequest();
        }

        string extension = Path.GetExtension(request.File.FileName);

        if (extension != ".jpg" && extension != ".jpeg" && extension != ".png" && extension != ".gif")
        {
            throw ServiceException.BadRequest("El archivo debe ser una imagen en formato JPG, JPEG, PNG o GIF");
        }
        
        var user = await _repo.GetById(_claimsService.GetUserId());
        if (user is null)
        {            
            throw ServiceException.NotFound();
        }

        try
        {
            using(var stream = new MemoryStream())
            {
                await request.File.CopyToAsync(stream);
                stream.Position = 0;
                string? format = Image.DetectFormat(stream)?.Name;

                if (format == null)  throw ServiceException.BadRequest("Unkown Format");
                           
                var image = Image.Load(stream);                
                image.Mutate(x => x.Resize(new ResizeOptions
                {
                    Size = new Size(200, 0),
                    Mode = ResizeMode.Max
                }));
                                
                IImageEncoder encoder;
                switch (format.ToLower())
                {
                    case "jpeg":
                    case "jpg":
                        encoder = new JpegEncoder { Quality = 80 };
                        break;
                    case "png":
                        encoder = new PngEncoder();
                        break;
                    default:
                        throw new NotSupportedException($"Formato de imagen no soportado: {format}");
                }

                using(var outputStream = new MemoryStream())
                {
                    image.Save(outputStream, encoder);

                    byte[] imageData = outputStream.ToArray();
                    user.PictureProfile = imageData;
                    await _repo.UpdateAsync(user);

                    var userProfile = new FileContentResult(imageData, "image/jpg").FileContents;
                    if (userProfile is not null && userProfile.Length > 0) 
                    {
                        return Convert.ToBase64String(userProfile);
                    }                          
                    
                    return "";
                }
            }
        }catch(Exception e)
        {
            Console.WriteLine($"ERROR ---> {e.Message}");
            throw ServiceException.BadRequest(e.Message);
        }
    }
}
namespace backend.src.Services.UserService;

using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.UserRepo;
using SixLabors.ImageSharp.Formats.Jpeg;

public class UserService : IUserService
{
    private readonly IUserRepo _repo;
    protected readonly IMapper _mapper;
    private readonly IClaimsPrincipalService _claimsService;
    
    public UserService(IUserRepo repo, IMapper mapper, IClaimsPrincipalService claimsService)
    {
        _repo = repo;
        _mapper = mapper;
        _claimsService = claimsService;
    }

    public async Task<UserReadDTO> Create(UserCreateDTO request)
    {          
        var user = await _repo.Create(request);
        if (user is null)
        {
            throw new Exception("Password Must Contain 1 Upper Letter, 1 Lower Letter, Alphanumeric and Special Caracter");
        }
        return _mapper.Map<User, UserReadDTO>(user);
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

    public async Task<string> SaveUserProfilePicture(UserProfilePictureDTO request)
    {
        byte[]? imageData = null;
        if (request.File.Length == 0 || request.File == null)
        {            
            throw ServiceException.BadRequest();
        }

        Console.WriteLine($"name ---> {request.File.Name}");
        Console.WriteLine($"name ---> {request.File.FileName}");

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

                using(var image = Image.Load(stream))
                {
                    image.Mutate(x => x.Resize(new ResizeOptions
                    {
                        Size = new Size(200, 0),
                        Mode = ResizeMode.Max
                    }));

                    var encoder = new JpegEncoder
                    {
                        Quality = 80
                    };

                    using(var outputStream = new MemoryStream())
                    {
                        image.Save(outputStream, encoder);
                        imageData = outputStream.ToArray();
                        user.PictureProfile = imageData;
                        await _repo.UpdateAsync(user);
                    }
                }
            }
        }catch(Exception e)
        {
            Console.WriteLine($"ERROR ---> {e.Message}");
        }

       

        if(imageData != null)
        {             
            throw ServiceException.NotFound();
        }
        return Encoding.ASCII.GetString(imageData); ;
    }
}
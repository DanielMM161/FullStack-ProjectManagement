namespace backend.src.Services.UserService;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.src.DTOs.User;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.UserRepo;

public class UserService : IUserService
{
    private readonly IUserRepo _repo;
    protected readonly IMapper _mapper;
    private readonly IClaimsPrincipalService _claimsService;
    
    public UserService(IUserRepo repo,  IMapper mapper, IClaimsPrincipalService claimsService)
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
            throw new Exception("Cannot create");
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
}
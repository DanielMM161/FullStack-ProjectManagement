namespace backend.src.Repositories.UserRepo;

using System.Threading.Tasks;
using backend.src.DTOs.User;
using backend.src.Models;
using Microsoft.AspNetCore.Identity;
using backend.src.Db;
using backend.src.Services.TokenService.cs;

public class UserRepo : IUserRepo
{
    protected readonly AppDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ITokenService _tokenService;

    public UserRepo(UserManager<User> userManager, ITokenService tokenService, AppDbContext context)
    {
        _context = context;
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<User?> GetById(int id)
    {
        return await _context.Set<User>().FindAsync(id);
    }

    public async Task<UserReadDTO?> Create(UserCreateDTO request)
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
        return new UserReadDTO
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
        };
    }
}
namespace backend.src.Repositories.UserRepo;

using System.Threading.Tasks;
using backend.src.DTOs.User;
using backend.src.Models;
using Microsoft.AspNetCore.Identity;
using backend.src.Db;
using backend.src.Services.TokenService;
using Microsoft.EntityFrameworkCore;

public class UserRepo : IUserRepo
{
    protected readonly AppDbContext _context;
    private readonly UserManager<User> _userManager;

    public UserRepo(UserManager<User> userManager, AppDbContext context)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task<User?> GetById(int id)
    {        
        return await _userManager.FindByIdAsync(id.ToString());
    }

    public async Task<User?> GetByEmail(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task<User?> Create(UserCreateDTO request)
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

    public async Task<ICollection<User>> GetAll()
    {
        return await _context.Set<User>().AsNoTracking().ToListAsync();
    }

    public async Task<User> UpdateAsync(User user)
    {
        await _userManager.UpdateAsync(user);
        return user;
    }

    public async Task<(bool, string)> ChangePassword(User user, string currentPassword, string newPassword)
    {
        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);        
        if (!result.Succeeded)
        {                     
            return (false, result.Errors.ToList()[0].Description);
        }
        return (true, "");
    }
}
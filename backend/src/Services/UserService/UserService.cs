namespace backend.src.Services.UserService;

using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.UserRepo;
using backend.src.Services.TokenService.cs;
using Microsoft.AspNetCore.Identity;

public class UserService : UserRepo, IUserService
{
    public UserService(UserManager<User> userManager, ITokenService tokenService, AppDbContext context) : base(userManager, tokenService, context)
    {}
}
namespace backend.src.Services.UserService;

using backend.src.DTOs.User;
using backend.src.Models;
using backend.src.Repositories.UserRepo;
using backend.src.Services.BaseService;

public interface IUserService
{
    Task<UserReadDTO> Create(UserCreateDTO request);
    Task<UserReadDTO> GetById(int id);
    Task<ICollection<UserReadDTO>> GetAll();
}
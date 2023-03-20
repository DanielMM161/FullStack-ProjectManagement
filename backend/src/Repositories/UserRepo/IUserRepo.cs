namespace backend.src.Repositories.UserRepo;

using backend.src.DTOs.User;
using backend.src.Models;

public interface IUserRepo
{    
    Task<User?> Create(UserCreateDTO request);
    Task<User?> GetById(int id);
    Task<ICollection<User>> GetAll();
}
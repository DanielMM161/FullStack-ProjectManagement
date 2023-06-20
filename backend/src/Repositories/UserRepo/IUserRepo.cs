namespace backend.src.Repositories.UserRepo;

using backend.src.DTOs.User;
using backend.src.Models;

public interface IUserRepo
{    
    Task<User?> Create(UserCreateDTO request);
    Task<User?> GetById(int id);
    Task<User?> GetByEmail(string email);
    Task<ICollection<User>> GetAll();
    Task<User> UpdateAsync(User user);
    Task<(bool, string)> ChangePassword(User user, string currentPassword, string newPassword);
    Task<bool> CheckPassword(User user, string password);

}
namespace backend.src.Services.UserService;

using backend.src.DTOs.User;

public interface IUserService
{
    Task<UserReadDTO> Create(UserCreateDTO request);
    Task<UserReadDTO> GetById(int id);
    Task<ICollection<UserReadDTO>> GetAll();
}
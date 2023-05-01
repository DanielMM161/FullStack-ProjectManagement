namespace backend.src.Services.UserService;

using backend.src.DTOs.User;

public interface IUserService
{
    Task<UserReadDTO> Create(UserCreateDTO request);
    Task<UserReadDTO> GetById(int id);
    Task<UserReadDTO> UpdateAsync(UserUpdateDTO request);
    Task<ICollection<UserReadDTO>> GetAll();
    Task<bool> ChangePassword(UserChangePasswordDTO request);
    Task<string> SaveUserProfilePicture(UserProfilePictureDTO request);
}
namespace backend.src.Services.UserService;

using backend.src.DTOs.User;
using Microsoft.AspNetCore.Mvc;

public interface IUserService
{
    Task<UserReadDTO> Create(UserCreateDTO request);
    Task<UserReadDTO> GetById(int id);
    Task<UserReadDTO> UpdateAsync(UserUpdateDTO request);
    Task<ICollection<UserReadDTO>> GetAll();
    Task<bool> ChangePassword(UserChangePasswordDTO request);
    Task<FileContentResult> SaveUserProfilePicture(UserProfilePictureDTO request);
}
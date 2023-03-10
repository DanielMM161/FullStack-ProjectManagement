namespace backend.Services.Interfaces;

using backend.DTOs.Request;
using backend.DTOs.Response;
using backend.Models;

public interface IUserService
{
    Task<SignInResponse?> SignInAsync(SignInRequest request);
    Task<User> SignUpAsync(SignUpRequest request);
}
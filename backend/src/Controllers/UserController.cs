namespace backend.src.Controllers;

using backend.src.DTOs.User;
using backend.src.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class UserController : ApiControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service) => _service = service;

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Create(UserCreateDTO request)
    {
        return Ok( await _service.Create(request));        
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());        
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _service.GetById(id));        
    }

    [HttpPut]
    public async Task<IActionResult> Update(UserUpdateDTO request)
    {
        return Ok(await _service.UpdateAsync(request));
    }

    [HttpPut("changepassword")]
    public async Task<IActionResult> ChangePassword(UserChangePasswordDTO request)
    {
        return Ok(await _service.ChangePassword(request));
    }

    [HttpPost("profile-picture")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> ProfilePicture([FromForm] UserProfilePictureDTO request)
    {        
        return Ok(await _service.SaveUserProfilePicture(request));
    }
}
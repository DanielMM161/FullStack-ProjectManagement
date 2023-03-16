namespace backend.src.Controllers;

using backend.src.DTOs.User;
using backend.src.Services.UserService;
using Microsoft.AspNetCore.Mvc;

public class UserController : ApiControllerBase
{
     private readonly IUserService _service;

    public UserController(IUserService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Create(UserCreateDTO request)
    {
        var user = await _service.Create(request);
        if (user is null) 
        {
            return BadRequest();
        }
        return Ok(user);        
    }
}
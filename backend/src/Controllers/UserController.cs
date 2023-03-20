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
        var user = await _service.Create(request);
        if (user is null) 
        {
            return BadRequest();
        }
        return Ok(user);        
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
}
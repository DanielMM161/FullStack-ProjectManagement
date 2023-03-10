namespace backend.Controllers;

using backend.DTOs.Request;
using backend.DTOs.Response;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class UserController : ApiControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service) => _service = service;

    [AllowAnonymous]
    [HttpPost("signup")]
    public async Task<IActionResult> SignUp(SignUpRequest request)
    {
        var user = await _service.SignUpAsync(request);
        if (user is null) 
        {
            return BadRequest();
        }
        return Ok(SignUpResponse.FromUser(user));        
    }

    [AllowAnonymous]
    [HttpPost("signin")]
    public async Task<IActionResult> SignIn(SignInRequest request)
    {
        var response = await _service.SignInAsync(request);
        if (response is null)
        {
            return Unauthorized();
        }
        return Ok(response);
    }
}
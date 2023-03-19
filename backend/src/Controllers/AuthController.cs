namespace backend.src.Controllers;

using backend.src.DTOs.Auth;
using backend.src.Services.AuthService.cs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class AuthController : ApiControllerBase
{
    private readonly IAuthService _service;

    public AuthController(IAuthService service) => _service = service;

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(AuthLoginDTO request)
    {
        return Ok(await _service.Login(request));
    }
        
    [HttpGet("profile")]
    public async Task<IActionResult> Profile()
    {
        return Ok(await _service.Profile());
    }
}
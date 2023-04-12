namespace backend.src.Controllers;

using backend.src.DTOs.Google;
using backend.src.Services.GoogleService;
using Microsoft.AspNetCore.Mvc;

public class GoogleAuthController : ApiControllerBase
{
    private readonly IGoogleService _service;

    public GoogleAuthController(IGoogleService service) => _service = service;
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginGoogleAuth(GoogleLoginDTO request)
    {
        return Ok(await _service.LoginGoogleAsync(request));
    }
}
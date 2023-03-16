namespace backend.src.Services.TokenService.cs;

using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.src.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.src.DTOs.Auth;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly UserManager<User> _userManager;

    public TokenService(IConfiguration config, UserManager<User> userManager)
    {
        _config = config;
        _userManager = userManager;
    }

    public async Task<AuthReadDTO> GenerateTokenAsync(User user)
    {
        // Payload
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.UserName),
        };

        // Secret
        var secret = _config["Jwt:Secret"];
        var signingKey = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
            SecurityAlgorithms.HmacSha256
        );

        // Expriation
        var expiration = DateTime.Now.AddHours(1);

        // Token description
        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            audience: null,
            claims,
            expires: expiration,
            signingCredentials: signingKey
        );
        var tokenWriter = new JwtSecurityTokenHandler();

        return new AuthReadDTO
        {
            Token = tokenWriter.WriteToken(token),
            Expiration = expiration
        };
    }
}
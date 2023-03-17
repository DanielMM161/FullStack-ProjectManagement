using System.Security.Claims;
using System.Security.Principal;

namespace backend.src.Helpers;

public interface IServiceUserFromToken
{
    ClaimsPrincipal GetClaim();
    int GetUserId();
}
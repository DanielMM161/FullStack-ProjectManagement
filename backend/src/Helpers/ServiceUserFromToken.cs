namespace backend.src.Helpers;

using System.Security.Claims;

public class ServiceUserFromToken : IServiceUserFromToken
{

    public ClaimsPrincipal User;

    public ServiceUserFromToken(ClaimsPrincipal user)
    {
        User = user;
    }

    public int GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier);
        return Convert.ToInt32(claim != null ? claim.Value : "-1");
    }

    public ClaimsPrincipal GetClaim()
    {
        return User;
    }
}